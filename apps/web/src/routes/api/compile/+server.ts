import { error } from "@sveltejs/kit";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { db } from "#lib/server/db/drizzle.ts";
import type { RequestHandler } from "./$types";

const execFileAsync = promisify(execFile);

export const POST: RequestHandler = async ({ request }) => {
  const { projectId } = await request.json();

  if (!projectId) {
    error(400, "projectId is required");
  }

  const project = await db.query.project.findFirst({
    with: {
      files: true,
    },
    where: {
      id: projectId,
    },
  });

  if (!project) {
    error(404, "Project not found");
  }

  const workDir = await mkdtemp(path.join(tmpdir(), "latexdex-"));

  try {
    // Write project files into the temporary compilation directory
    for (const file of project.files) {
      const filePath = path.join(workDir, file.path);

      await mkdir(path.dirname(filePath), { recursive: true });
      await writeFile(filePath, file.text ?? "");
    }

    const mainFile = "main.tex";

    // Compile inside TeX Live
    await execFileAsync(
      "docker",
      [
        "run",
        "--rm",
        "--network=none",
        "--cpus=1",
        "--memory=512m",
        "-v",
        `${workDir}:/work`,
        "texlive/texlive:latest",
        "pdflatex",
        "-no-shell-escape",
        "-interaction=nonstopmode",
        "-halt-on-error",
        "-output-directory=/work",
        `/work/${mainFile}`,
      ],
      {
        timeout: 30_000,
      },
    );

    const pdf = await readFile(
      path.join(workDir, mainFile.replace(/\.tex$/, ".pdf")),
    );

    return new Response(pdf, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'inline; filename="document.pdf"',
      },
    });
  } catch (err) {
    console.error("LaTeX compilation failed:", err);

    let log = "";

    try {
      log = await readFile(path.join(workDir, "main.log"), "utf8");
    } catch {
      // No log was generated
    }

    return new Response(
      JSON.stringify({
        error: "LaTeX compilation failed",
        log,
      }),
      {
        status: 422,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  } finally {
    await rm(workDir, {
      recursive: true,
      force: true,
    });
  }
};

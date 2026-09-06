import { command } from "$app/server";
import z from "zod";
import { projectFile } from "./server/db/schema";
import { db } from "./server/db/drizzle";
import { getProject } from "./projects.remote";
import { eq } from "drizzle-orm";

export const createProjectFile = command(
  z.object({
    projectId: z.uuidv7(),
    path: z.string(),
  }),
  async ({ projectId, path }) => {
    await db.insert(projectFile).values({
      projectId,
      path,
      text: "",
    });

    await getProject({ projectId }).refresh();
  },
);

export const updateProjectFilePath = command(
  z.object({
    projectId: z.uuidv7(),
    path: z.string(),
  }),
  async ({ projectId, path }) => {
    await db
      .update(projectFile)
      .set({ path })
      .where(eq(projectFile.projectId, projectId));

    await getProject({ projectId }).refresh();
  },
);

export const updateProjectFileText = command(
  z.object({
    projectId: z.uuidv7(),
    text: z.string(),
  }),
  async ({ projectId, text }) => {
    await db
      .update(projectFile)
      .set({ text })
      .where(eq(projectFile.projectId, projectId));

    await getProject({ projectId }).refresh();
  },
);

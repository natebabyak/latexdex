import { error } from "@sveltejs/kit";
import { db } from "#lib/server/db/drizzle.ts";
import {
  project,
  projectCollaborator,
  projectFile,
  projectsToTags,
  projectTag,
} from "#lib/server/db/schema.ts";
import { command, getRequestEvent, query } from "$app/server";
import z from "zod";
import { eq } from "drizzle-orm";
import { PROJECT_COLLABORATOR_ROLES } from "./constants";

export const createProject = command(
  z.object({
    title: z.string(),
  }),
  async ({ title }) => {
    const event = getRequestEvent();
    if (!event) error(500, "Internal Server Error");

    const { user } = event.locals;
    if (!user) error(401, "Unauthorized");

    await db.transaction(async (tx) => {
      const [{ id: projectId }] = await tx
        .insert(project)
        .values({
          ownerId: user.id,
          title,
        })
        .returning();

      await tx.insert(projectFile).values({
        projectId,
        path: "main.tex",
        text: "\\documentclass{article}\n\n\\begin{document}\n\n\\section{Hello, World!}\n\n\\end{document}",
      });
    });

    await getProjects().refresh();
  },
);

export const getProject = query(
  z.object({
    projectId: z.string().optional(),
  }),
  async ({ projectId }) => {
    const event = getRequestEvent();
    if (!event) error(500, "Internal Server Error");

    const { user } = event.locals;
    if (!user) error(401, "Unauthorized");

    const project = await db.query.project.findFirst({
      with: {
        collaborators: true,
        files: true,
        owner: true,
      },
      where: {
        id: projectId,
      },
    });

    if (!project) error(404, "Not Found");

    if (
      project.owner?.id !== user.id &&
      !project.collaborators.some((c) => c.id === user.id)
    )
      error(403, "Forbidden");

    return project;
  },
);

export const getProjects = query(async () => {
  const event = getRequestEvent();
  if (!event) error(500, "Internal Server Error");

  const { user } = event.locals;
  if (!user) error(401, "Unauthorized");

  const projects = await db.query.project.findMany({
    where: {
      OR: [
        {
          ownerId: user.id,
        },
        {
          collaborators: {
            id: user.id,
          },
        },
      ],
    },
    with: {
      collaborators: true,
      owner: true,
      tags: true,
    },
  });

  return projects;
});

export const updateProjectTitle = command(
  z.object({
    id: z.uuidv7(),
    title: z.string(),
  }),
  async ({ id, title }) => {
    await db.update(project).set({ title }).where(eq(project.id, id));

    await getProjects().refresh();
  },
);

export const deleteProject = command(
  z.object({
    id: z.uuidv7(),
  }),
  async ({ id }) => {
    await db.delete(project).where(eq(project.id, id));

    await getProjects().refresh();
  },
);

export const createProjectCollaborator = command(
  z.object({
    projectId: z.uuidv7(),
    collaboratorId: z.uuidv7(),
    role: z.enum(PROJECT_COLLABORATOR_ROLES),
  }),
  async ({ projectId, collaboratorId, role }) => {
    await db.insert(projectCollaborator).values({
      projectId,
      collaboratorId,
      role,
    });

    await getProjects().refresh();
  },
);

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

    await getProjects().refresh();
    await getProject({ projectId }).refresh();
  },
);

export const createProjectTag = command(
  z.object({
    projectId: z.string(),
    text: z.string(),
  }),
  async ({ projectId, text }) => {
    const event = getRequestEvent();
    if (!event) error(500, "Internal Server Error");

    const { user } = event.locals;
    if (!user) error(401, "Unauthorized");

    await db.transaction(async (tx) => {
      const [{ id: tagId }] = await tx
        .insert(projectTag)
        .values({
          ownerId: user.id,
          text,
        })
        .onConflictDoNothing()
        .returning();

      await tx.insert(projectsToTags).values({
        projectId,
        tagId,
      });
    });

    await getProjects().refresh();
  },
);

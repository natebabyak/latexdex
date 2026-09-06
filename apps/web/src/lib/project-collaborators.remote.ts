import { command } from "$app/server";
import z from "zod";
import { db } from "./server/db/drizzle";
import { projectCollaborator } from "./server/db/schema";
import { getProject, getProjects } from "./projects.remote";
import { PROJECT_COLLABORATOR_ROLES } from "./constants";
import { and, eq } from "drizzle-orm";

export const addCollaboratorToProject = command(
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
    await getProject({ projectId }).refresh();
  },
);

export const changeCollaboratorRole = command(
  z.object({
    projectId: z.uuidv7(),
    collaboratorId: z.uuidv7(),
    role: z.enum(PROJECT_COLLABORATOR_ROLES),
  }),
  async ({ projectId, collaboratorId, role }) => {
    await db
      .update(projectCollaborator)
      .set({ role })
      .where(
        and(
          eq(projectCollaborator.projectId, projectId),
          eq(projectCollaborator.collaboratorId, collaboratorId),
        ),
      );

    await getProjects().refresh();
    await getProject({ projectId }).refresh();
  },
);

export const removeCollaboratorFromProject = command(
  z.object({
    projectId: z.uuidv7(),
    collaboratorId: z.uuidv7(),
  }),
  async ({ projectId, collaboratorId }) => {
    await db
      .delete(projectCollaborator)
      .where(
        and(
          eq(projectCollaborator.projectId, projectId),
          eq(projectCollaborator.collaboratorId, collaboratorId),
        ),
      );

    await getProjects().refresh();
    await getProject({ projectId }).refresh();
  },
);

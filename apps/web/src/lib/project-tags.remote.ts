import { command, getRequestEvent } from "$app/server";
import { error } from "@sveltejs/kit";
import z from "zod";
import { db } from "./server/db/drizzle";
import { projectsToTags, projectTag } from "./server/db/schema";
import { getProjects } from "./projects.remote";
import { and, eq } from "drizzle-orm";

export const addTagToProject = command(
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
        .values({ ownerId: user.id, text })
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

export const updateProjectTagText = command(
  z.object({
    tagId: z.string(),
    text: z.string(),
  }),
  async ({ tagId, text }) => {
    await db.update(projectTag).set({ text }).where(eq(projectTag.id, tagId));

    await getProjects().refresh();
  },
);

export const removeTagFromProject = command(
  z.object({
    projectId: z.string(),
    tagId: z.string(),
  }),
  async ({ projectId, tagId }) => {
    await db
      .delete(projectsToTags)
      .where(
        and(
          eq(projectsToTags.projectId, projectId),
          eq(projectsToTags.tagId, tagId),
        ),
      );

    await getProjects().refresh();
  },
);

export const deleteProjectTag = command(
  z.object({
    tagId: z.string(),
  }),
  async ({ tagId }) => {
    await db.delete(projectTag).where(eq(projectTag.id, tagId));

    await getProjects().refresh();
  },
);

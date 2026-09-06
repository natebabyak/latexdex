import { error } from "@sveltejs/kit";
import z from "zod";
import { ARTIFACT_TYPES } from "#lib/constants.ts";
import { db } from "#lib/server/db/drizzle.ts";
import {
  artifact,
  artifactFile,
  artifactsToTags,
  artifactTag,
} from "#lib/server/db/schema.ts";
import { form, getRequestEvent, query } from "$app/server";

export const createArtifact = form(
  z.object({
    title: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    type: z.enum(ARTIFACT_TYPES),
    files: z
      .array(
        z.object({
          path: z.string(),
          content: z.string(),
        }),
      )
      .min(1),
    tags: z
      .array(
        z.object({
          content: z.string(),
        }),
      )
      .max(10)
      .optional(),
  }),
  async ({ title, description, type, files, tags }) => {
    const event = getRequestEvent();
    if (!event) error(500, "Internal Server Error");

    const { user } = event.locals;
    if (!user) error(401, "Unauthorized");

    const [{ artifactId }] = await db
      .insert(artifact)
      .values({
        authorId: user.id,
        title,
        description,
        type,
      })
      .returning({
        artifactId: artifact.id,
      });

    await db.insert(artifactFile).values(
      files.map(({ path, content }) => ({
        artifactId,
        path,
        content,
      })),
    );

    if (tags) {
      await db
        .insert(artifactTag)
        .values(
          tags.map(({ content }) => ({
            text: content,
          })),
        )
        .onConflictDoNothing();

      await db.insert(artifactsToTags).values(
        tags.map(({ content }) => ({
          artifactId,
          tagId: content,
        })),
      );
    }
  },
);

export const getArtifacts = query(
  z.object({
    q: z.string().optional().default(""),
  }),
  async ({ q }) => {
    const artifacts = await db.query.artifact.findMany({
      where: {
        title: {
          ilike: `%${q}%`,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return artifacts;
  },
);

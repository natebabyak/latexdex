import { defineRelations, sql } from "drizzle-orm";
import {
  check,
  date,
  integer,
  pgEnum,
  primaryKey,
  snakeCase,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";
import {
  ARTIFACT_TYPES,
  ARTIFACT_VISIBILITIES,
  PROJECT_COLLABORATOR_ROLES,
} from "#lib/constants.ts";
import { user } from "#lib/server/db/auth.schema.ts";

export const artifactType = pgEnum("artifact_type", ARTIFACT_TYPES);

export const artifactVisibility = pgEnum(
  "artifact_visibility",
  ARTIFACT_VISIBILITIES,
);

export const projectCollaboratorRole = pgEnum(
  "project_collaborator_role",
  PROJECT_COLLABORATOR_ROLES,
);

export const artifact = snakeCase.table("artifact", {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  authorId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text().notNull(),
  description: text(),
  type: artifactType().notNull(),
  visibility: artifactVisibility().notNull().default("public"),
  downloadCount: integer().notNull().default(0),
  starCount: integer().notNull().default(0),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const artifactDailyDownloadCount = snakeCase.table(
  "artifact_daily_download_count",
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    artifactId: uuid()
      .notNull()
      .references(() => artifact.id, { onDelete: "cascade" }),
    date: date()
      .notNull()
      .default(sql`CURRENT_DATE`),
    count: integer().notNull().default(0),
  },
  (table) => [unique().on(table.artifactId, table.date)],
);

export const artifactFile = snakeCase.table(
  "artifact_file",
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    artifactId: uuid()
      .notNull()
      .references(() => artifact.id, { onDelete: "cascade" }),
    path: text().notNull(),
    text: text(),
    objectKey: text(),
  },
  (table) => [
    unique().on(table.artifactId, table.path),
    check(
      "artifact_file_text_content_object_key_xor",
      sql`num_nonnulls(${table.text}, ${table.objectKey}) = 1`,
    ),
  ],
);

export const artifactStar = snakeCase.table(
  "artifact_star",
  {
    artifactId: uuid()
      .notNull()
      .references(() => artifact.id, { onDelete: "cascade" }),
    starredById: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.artifactId, table.starredById] })],
);

export const artifactTag = snakeCase.table("artifact_tag", {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  text: text().notNull().unique(),
});

export const artifactsToTags = snakeCase.table(
  "artifacts_to_tags",
  {
    artifactId: uuid()
      .notNull()
      .references(() => artifact.id, { onDelete: "cascade" }),
    tagId: uuid()
      .notNull()
      .references(() => artifactTag.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.artifactId, table.tagId] })],
);

export const project = snakeCase.table("project", {
  id: uuid()
    .primaryKey()
    .default(sql`uuidv7()`),
  ownerId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp({ withTimezone: true })
    .notNull()
    .defaultNow()
    .$onUpdate(() => new Date()),
});

export const projectCollaborator = snakeCase.table(
  "project_collaborator",
  {
    projectId: uuid()
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    collaboratorId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    role: projectCollaboratorRole().notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.collaboratorId] })],
);

export const projectFile = snakeCase.table(
  "project_file",
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    projectId: uuid()
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    path: text().notNull(),
    text: text(),
    objectKey: text(),
  },
  (table) => [
    unique().on(table.projectId, table.path),
    check(
      "project_file_text_content_object_key_xor",
      sql`num_nonnulls(${table.text}, ${table.objectKey}) = 1`,
    ),
  ],
);

export const projectTag = snakeCase.table(
  "project_tag",
  {
    id: uuid()
      .primaryKey()
      .default(sql`uuidv7()`),
    ownerId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    text: text().notNull(),
  },
  (table) => [unique().on(table.ownerId, table.text)],
);

export const projectsToTags = snakeCase.table(
  "projects_to_tags",
  {
    projectId: uuid()
      .notNull()
      .references(() => project.id, { onDelete: "cascade" }),
    tagId: uuid()
      .notNull()
      .references(() => projectTag.id, { onDelete: "cascade" }),
  },
  (table) => [primaryKey({ columns: [table.projectId, table.tagId] })],
);

export const relations = defineRelations(
  {
    artifact,
    artifactDailyDownloadCount,
    artifactFile,
    artifactStar,
    artifactTag,
    artifactsToTags,
    project,
    projectCollaborator,
    projectFile,
    projectTag,
    projectsToTags,
    user,
  },
  (r) => ({
    artifact: {
      author: r.one.user({
        from: r.artifact.authorId,
        to: r.user.id,
        alias: "artifact_author",
      }),
      dailyDownloadCounts: r.many.artifactDailyDownloadCount(),
      files: r.many.artifactFile(),
      starredBy: r.many.user({
        from: r.artifact.id.through(r.artifactStar.artifactId),
        to: r.user.id.through(r.artifactStar.starredById),
        alias: "artifact_starred_by",
      }),
      tags: r.many.artifactTag({
        from: r.artifact.id.through(r.artifactsToTags.artifactId),
        to: r.artifactTag.id.through(r.artifactsToTags.tagId),
      }),
    },
    artifactDailyDownloadCount: {
      artifact: r.one.artifact({
        from: r.artifactDailyDownloadCount.artifactId,
        to: r.artifact.id,
      }),
    },
    artifactFile: {
      artifact: r.one.artifact({
        from: r.artifactFile.artifactId,
        to: r.artifact.id,
      }),
    },
    artifactTag: {
      artifacts: r.many.artifact(),
    },
    project: {
      collaborators: r.many.user({
        from: r.project.id.through(r.projectCollaborator.projectId),
        to: r.user.id.through(r.projectCollaborator.collaboratorId),
        alias: "project_collaborators",
      }),
      files: r.many.projectFile(),
      owner: r.one.user({
        from: r.project.ownerId,
        to: r.user.id,
        alias: "project_owner",
      }),
      tags: r.many.projectTag({
        from: r.project.id.through(r.projectsToTags.projectId),
        to: r.projectTag.id.through(r.projectsToTags.tagId),
      }),
    },
    projectFile: {
      project: r.one.project({
        from: r.projectFile.projectId,
        to: r.project.id,
      }),
    },
    projectTag: {
      owner: r.one.user({
        from: r.projectTag.ownerId,
        to: r.user.id,
      }),
      projects: r.many.project(),
    },
    user: {
      authoredArtifacts: r.many.artifact({
        alias: "artifact_author",
      }),
      ownedProjects: r.many.project({
        alias: "project_owner",
      }),
      collaboratingProjects: r.many.project({
        alias: "project_collaborators",
      }),
      starredArtifacts: r.many.artifact({
        alias: "artifact_starred_by",
      }),
    },
  }),
);

export * from "#lib/server/db/auth.schema.ts";

export type ProjectFile = typeof projectFile.$inferSelect;

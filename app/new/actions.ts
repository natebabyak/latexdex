"use server";

import { db } from "@/db/drizzle";
import { entry, NewEntry } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import z from "zod";

export const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long (max 100 characters)"),
  description: z
    .string()
    .max(500, "Description is too long (max 500 characters)"),
  content: z.string().min(1, "Content is required"),
});

export async function createEntry(values: z.infer<typeof schema>) {
  const validatedFields = schema.safeParse({
    title: values.title,
    description: values.description,
    content: values.content,
  });

  if (!validatedFields.success) {
    return {
      errors: z.treeifyError(validatedFields.error),
    };
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("User is not authenticated");
  }

  const newEntry: NewEntry = {
    id: crypto.randomUUID(),
    title: values.title,
    description: values.description,
    content: values.content,
    userId: session.user.id,
  };

  await db.insert(entry).values(newEntry);
}

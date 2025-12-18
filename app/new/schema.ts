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

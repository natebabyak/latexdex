"use client";

import CodeMirror, { keymap } from "@uiw/react-codemirror";
import { Button } from "@/components/ui/button";
import { autocompletion, completionKeymap, latex } from "codemirror-lang-latex";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { TagsInput } from "./tags-input";
import { BlockMath } from "react-katex";
import { useTheme } from "next-themes";
import { db } from "@/db/drizzle";
import { entry, NewEntry } from "@/db/schema";
import { authClient } from "@/lib/auth-client";

const schema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title is too long (max 100 characters)"),
  description: z
    .string()
    .max(500, "Description is too long (max 500 characters)"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(2500, "Content is too long (max 2500 characters)"),
  tags: z
    .array(z.string())
    .min(1, "At least 1 tag is required")
    .max(20, "Too many tags (max 20 tags)"),
});

export function NewForm() {
  const { theme } = useTheme();
  const { data: session } = authClient.useSession();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    if (!session) return;

    const newEntry: NewEntry = {
      id: crypto.randomUUID(),
      title: values.title,
      description: values.description,
      content: values.content,
      userId: session.user.id,
    };

    await db.insert(entry).values(newEntry).returning({ id: entry.id });
  }

  return (
    <form
      id="new-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4"
    >
      <FieldGroup className="grid gap-4">
        <FieldSet>
          <FieldLegend>Create New</FieldLegend>
          <FieldDescription>
            Create a new database entry by providing a name, its content, and at
            least 1 tag
          </FieldDescription>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="new-form-title">Title</FieldLabel>
                <Input
                  aria-invalid={fieldState.invalid}
                  {...field}
                  id="new-form-title"
                  placeholder="Quadratic Formula"
                  required
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="new-form-content">Content</FieldLabel>
                <div className="min-h-32 border">
                  <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={50}>
                      <CodeMirror
                        extensions={[
                          latex(),
                          autocompletion(),
                          keymap.of(completionKeymap),
                        ]}
                        minHeight="200px"
                        onChange={field.onChange}
                        theme={theme === "dark" ? "dark" : "light"}
                        value={field.value}
                      />
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={50}>
                      <BlockMath math={field.value} />
                    </ResizablePanel>
                  </ResizablePanelGroup>
                </div>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="tags"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="new-form-description">Tags</FieldLabel>
                <TagsInput {...field} />
                <FieldDescription className="text-xs">
                  Separate with spaces
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldSet>
      </FieldGroup>
      <div className="flex w-full justify-end gap-2">
        <Button type="submit">
          <Check />
          Submit
        </Button>
      </div>
    </form>
  );
}

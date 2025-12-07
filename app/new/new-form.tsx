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
import { BlockMath } from "react-katex";
import { useTheme } from "next-themes";
import { createEntry, schema } from "./actions";

export function NewForm() {
  const { theme } = useTheme();

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    createEntry(values);
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

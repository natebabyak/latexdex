"use client";

import { Button } from "@/components/ui/button";
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
import { Editor } from "@/components/editor";
import { Latex } from "@/components/latex";
import { TagsInput } from "./tags-input";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).min(1).max(15, ""),
});

export function NewForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      tags: [],
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    console.log("hi");
    console.log(values);
  }

  return (
    <form
      id="new-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4"
    >
      <FieldGroup className="grid gap-4">
        <FieldSet>
          <FieldLegend>New Entry</FieldLegend>
          <FieldDescription>Description</FieldDescription>
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
                <div className="min-h-32 rounded-2xl border">
                  <ResizablePanelGroup direction="horizontal">
                    <ResizablePanel defaultSize={50}>
                      <Editor {...field} />
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={50}>
                      <Latex value={field.value} />
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

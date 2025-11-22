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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import TextareaAutosize from "react-textarea-autosize";
import { MathJax } from "better-react-mathjax";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).min(5).max(15, ""),
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
    <div className="w-full max-w-5xl">
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
                  <InputGroup>
                    <TextareaAutosize
                      aria-invalid={fieldState.invalid}
                      data-slot="input-group-control"
                      {...field}
                      id="new-form-content"
                      className="flex field-sizing-content w-full resize-none bg-transparent p-2 px-3 py-2.5 text-sm outline-none"
                    />
                  </InputGroup>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <MathJax>{field.value}</MathJax>
                </Field>
              )}
            />
            <Controller
              name="tags"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="new-form-description">
                    Content
                  </FieldLabel>
                  <InputGroup>
                    <TextareaAutosize
                      aria-invalid={fieldState.invalid}
                      data-slot="input-group-control"
                      {...field}
                      id="new-form-description"
                      className="flex field-sizing-content w-full resize-none rounded-md bg-transparent px-3 py-2.5 outline-none"
                    />
                    <InputGroupAddon align="block-end">
                      <InputGroupButton
                        size="sm"
                        variant="default"
                        className="ml-auto"
                      >
                        Format
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                  <MathJax>{field.value}</MathJax>
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
    </div>
  );
}

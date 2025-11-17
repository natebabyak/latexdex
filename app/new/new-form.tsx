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
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  content: z.string().min(1, "Content is required"),
});

export function NewForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
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
                  type="text"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldSet>
      </FieldGroup>
      <Button>Cancel</Button>
      <Button type="submit">Create</Button>
    </form>
  );
}

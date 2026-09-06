<script lang="ts">
import { createForm } from "@tanstack/svelte-form";
import katex from "katex";
import { createArtifact } from "#lib/artifacts.remote.ts";
import { Button } from "#lib/components/ui/button/index.ts";
import * as Dialog from "#lib/components/ui/dialog/index.ts";
import * as Field from "#lib/components/ui/field/index.ts";
import { Input } from "#lib/components/ui/input/index.ts";
import { Textarea } from "#lib/components/ui/textarea/index.ts";

const form = createForm(() => ({
  defaultValues: {
    title: "",
    description: "",
    type: undefined,
    file: "",
    tags: "",
  },
}));
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({props})}
      <Button {...props}>Create Artifact</Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create Artifact</Dialog.Title>
    </Dialog.Header>
    <form>
      <Field.Group>
        <form.Field name="title">
          {#snippet children(field)}
            <Field.Field>
              <Field.Label for={field.name}>Title</Field.Label>
              <Input
                id={field.name}
                name={field.name}
                onblur={field.handleBlur}
                placeholder="Quadratic Formula"
                value={field.state.value}
                oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
              />
            </Field.Field>
          {/snippet}
        </form.Field>
        <form.Field name="description">
          {#snippet children(field)}
            <Field.Field>
              <Field.Label for={field.name}>Description</Field.Label>
              <Textarea
                id={field.name}
                name={field.name}
                onblur={field.handleBlur}
                placeholder="A closed-form expression describing the solutions of a quadratic equation."
                value={field.state.value}
                oninput={(e) => field.handleChange((e.target as HTMLTextAreaElement).value)}
              />
            </Field.Field>
          {/snippet}
        </form.Field>
        <form.Field name="file">
          {#snippet children(field)}
            <Field.Field>
              <Field.Label for={field.name}>Snippet</Field.Label>
              <Textarea
                name={field.name}
                onblur={field.handleBlur}
                placeholder={`\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}`}
                value={field.state.value}
                oninput={(e) => field.handleChange((e.target as HTMLTextAreaElement).value)}
              />
              <Field.Description></Field.Description>
              {#if field.state.meta.errors}
                <Field.Error>{field.state.meta.errors.join(", ")}</Field.Error>
              {/if}
            </Field.Field>
          {/snippet}
        </form.Field>
      </Field.Group>
      <Dialog.Footer>
        <Button type="submit">Done</Button>
      </Dialog.Footer>
    </form>
  </Dialog.Content>
</Dialog.Root>

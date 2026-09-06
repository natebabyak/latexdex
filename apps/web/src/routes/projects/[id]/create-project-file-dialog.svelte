<script lang="ts">
  import { createForm } from "@tanstack/svelte-form";
  import type { Snippet } from "svelte";
  import z from "zod";

  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Dialog from "#lib/components/ui/dialog/index.ts";
  import * as Field from "#lib/components/ui/field/index.ts";
  import { Input } from "#lib/components/ui/input/index.ts";
  import { Spinner } from "#lib/components/ui/spinner/index.ts";
  import { createProjectFile } from "#lib/projects.remote.ts";

  let {
    children,
    directory,
    projectId,
  }: {
    children: Snippet<[]>;
    directory: string;
    projectId: string;
  } = $props();

  const schema = z.object({
    fileName: z
      .string()
      .min(1, "File name is required")
      .refine(
        (value) =>
          value.endsWith(".bib") ||
          value.endsWith(".cls") ||
          value.endsWith(".md") ||
          value.endsWith(".sty") ||
          value.endsWith(".tex"),
        "File name must end with .bib, .cls, .md, .sty or .tex",
      ),
  });

  let open = $state(false);

  const form = createForm(() => ({
    defaultValues: {
      fileName: "",
    },
    validators: {
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      await createProjectFile({
        projectId,
        path: `${directory}${value.fileName}`,
      });

      open = false;
    },
  }));

  function handleKeydown(e: KeyboardEvent) {
    if ((e.metaKey || e.ctrlKey) && e.code === "KeyN") {
      e.preventDefault();
      open = !open;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<Dialog.Root bind:open>
  {@render children()}
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create Project File</Dialog.Title>
      <Dialog.Description>Enter a file name.</Dialog.Description>
    </Dialog.Header>
    <form
      id="create-project-file-form"
      onsubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <Field.FieldGroup>
        <form.Field name="fileName">
          {#snippet children(field)}
            <Field.Field>
              <Field.Label for={field.name}>File Name</Field.Label>
              <Input
                aria-invalid={field.state.meta.errors.length > 0}
                autocapitalize="none"
                autocorrect="off"
                autofocus
                id={field.name}
                name={field.name}
                onblur={field.handleBlur}
                placeholder="untitled.tex"
                value={field.state.value}
                oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
              />
              {#if field.state.meta.errors.length > 0}
                <Field.Error>{field.state.meta.errors[0]?.message}</Field.Error>
              {/if}
            </Field.Field>
          {/snippet}
        </form.Field>
      </Field.FieldGroup>
    </form>
    <Dialog.Footer>
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} form="create-project-file-form" type="reset" variant="outline">
            Cancel
          </Button>
        {/snippet}
      </Dialog.Close>
      <form.Subscribe
        selector={(state) => ({
          isSubmitting: state.isSubmitting,
        })}
      >
        {#snippet children({ isSubmitting })}
          <Button disabled={isSubmitting} form="create-project-file-form" type="submit">
            {#if isSubmitting}
              <Spinner />
            {/if}
            Create
          </Button>
        {/snippet}
      </form.Subscribe>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<script lang="ts">
  import { PlusIcon } from "@lucide/svelte";
  import { createForm } from "@tanstack/svelte-form";
  import z from "zod";

  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Dialog from "#lib/components/ui/dialog/index.ts";
  import * as Field from "#lib/components/ui/field/index.ts";
  import { Input } from "#lib/components/ui/input/index.ts";
  import * as Kbd from "#lib/components/ui/kbd/index.ts";
  import { Spinner } from "#lib/components/ui/spinner/index.ts";
  import { createProject } from "#lib/projects.remote.ts";

  const schema = z.object({
    title: z.string().max(255, "Your project title can't be longer than 255 characters"),
  });

  let open = $state(false);

  const form = createForm(() => ({
    defaultValues: {
      title: "",
    },
    validators: {
      onMount: schema,
      onChange: schema,
      onBlur: schema,
    },
    onSubmit: async ({ value }) => {
      await createProject({
        title: value.title || "Untitled Project",
      });

      open = false;
    },
  }));

  function handleKeydown(e: KeyboardEvent) {
    if (e.shiftKey && e.altKey && e.code === "KeyN") {
      e.preventDefault();
      open = !open;
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Button {...props}>
        <PlusIcon />
        Create Project
        <Kbd.Root>&#x21e7;&#x2325;N</Kbd.Root>
      </Button>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Create Project</Dialog.Title>
      <Dialog.Description>Enter a title for your project to get started.</Dialog.Description>
    </Dialog.Header>
    <form
      id="create-project-form"
      onsubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <form.Field name="title">
        {#snippet children(field)}
          <Field.Field>
            <Field.Label for={field.name}>Project Title</Field.Label>
            <Input
              aria-invalid={field.state.meta.errors.length > 0}
              autocapitalize="words"
              autofocus
              id={field.name}
              name={field.name}
              onblur={field.handleBlur}
              placeholder="Untitled Project"
              value={field.state.value}
              oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
            />
            {#if field.state.meta.errors.length > 0}
              <Field.Error>
                {field.state.meta.errors[0]?.message}
              </Field.Error>
            {/if}
          </Field.Field>
        {/snippet}
      </form.Field>
    </form>
    <Dialog.Footer>
      <Dialog.Close>
        {#snippet child({ props })}
          <Button {...props} form="create-project-form" type="reset" variant="outline">
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
          <Button disabled={isSubmitting} form="create-project-form" type="submit">
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

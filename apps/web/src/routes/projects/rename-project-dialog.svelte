<script lang="ts">
  import { PenIcon } from "@lucide/svelte";
  import { createForm } from "@tanstack/svelte-form";

  import * as Dialog from "#lib/components/ui/dialog/index.ts";
  import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.ts";
  import * as Field from "#lib/components/ui/field/index.ts";
  import Input from "#lib/components/ui/input/input.svelte";
  import { updateProjectTitle } from "#lib/projects.remote.ts";

  interface RenameProjectDialogProps {
    projectId: string;
    projectTitle: string;
  }

  let { projectId, projectTitle }: RenameProjectDialogProps = $props();

  const form = createForm(() => ({
    defaultValues: {
      projectTitle,
    },
    onSubmit: async ({ value }) => {
      await updateProjectTitle({
        id: projectId,
        title: value.projectTitle,
      });
    },
  }));
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <DropdownMenu.Item {...props}>
        <PenIcon />
        Rename
      </DropdownMenu.Item>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Title>Rename Project</Dialog.Title>
    <Dialog.Description>Enter a new title for your project.</Dialog.Description>
    <Field.Field>
      <Field.Label>Project Title</Field.Label>
      <Input placeholder="" />
    </Field.Field>
  </Dialog.Content>
</Dialog.Root>

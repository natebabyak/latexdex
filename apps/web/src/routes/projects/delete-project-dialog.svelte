<script lang="ts">
  import { Trash2Icon } from "@lucide/svelte";

  import * as AlertDialog from "#lib/components/ui/alert-dialog/index.ts";
  import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.ts";
  import { deleteProject } from "#lib/projects.remote.ts";

  interface DeleteProjectDialogProps {
    projectId: string;
    projectTitle: string;
  }

  let { projectId, projectTitle }: DeleteProjectDialogProps = $props();
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger>
    {#snippet child({ props })}
      <DropdownMenu.Item {...props} onSelect={(e) => e.preventDefault()}>
        <Trash2Icon />
        Delete
      </DropdownMenu.Item>
    {/snippet}
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Delete "{projectTitle}"</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action
        onclick={async () => await deleteProject({ id: projectId })}
        variant="destructive"
      >
        Delete
      </AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>

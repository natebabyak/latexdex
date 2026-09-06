<script lang="ts">
  import { EllipsisIcon } from "@lucide/svelte";

  import { Button } from "#lib/components/ui/button/index.ts";
  import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.ts";

  import DeleteProjectDialog from "./delete-project-dialog.svelte";
  import RenameProjectDialog from "./rename-project-dialog.svelte";

  interface ActionsCellProps {
    projectId: string;
    projectTitle: string;
  }

  let { projectId, projectTitle }: ActionsCellProps = $props();
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} size="icon" variant="ghost">
        <EllipsisIcon />
      </Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content align="end">
    <DropdownMenu.Group>
      <RenameProjectDialog {projectId} {projectTitle} />
      <DeleteProjectDialog {projectId} {projectTitle} />
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

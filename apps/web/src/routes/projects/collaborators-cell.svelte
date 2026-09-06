<script lang="ts">
  import * as Avatar from "#lib/components/ui/avatar/index.ts";
  import * as Dialog from "#lib/components/ui/dialog/index.ts";
  import type { getProjects } from "#lib/projects.remote.ts";

  interface Props {
    id: string;
    collaborators: Awaited<ReturnType<typeof getProjects>>[number]["collaborators"];
  }

  let { id, collaborators }: Props = $props();
</script>

<Dialog.Root>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Avatar.Root {...props}>
        {#each collaborators as collaborator}
          <Avatar.Image src={collaborator.image} />
          <Avatar.Fallback>
            {collaborator.name.charAt(0).toUpperCase()}
          </Avatar.Fallback>
          <Avatar.GroupCount>
            {collaborators.length}
          </Avatar.GroupCount>
        {/each}
      </Avatar.Root>
    {/snippet}
  </Dialog.Trigger>
</Dialog.Root>

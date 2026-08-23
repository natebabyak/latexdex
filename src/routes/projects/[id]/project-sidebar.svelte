<script lang="ts">
  import {
    ChevronDownIcon,
    ChevronRightIcon,
    FileIcon,
    FilesIcon,
    FolderIcon,
    GitBranchIcon,
    SearchIcon,
  } from "@lucide/svelte";

  import * as Collapsible from "#lib/components/ui/collapsible/index.ts";
  import * as ContextMenu from "#lib/components/ui/context-menu/index.ts";
  import * as InputGroup from "#lib/components/ui/input-group/index.ts";
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
  import * as Tabs from "#lib/components/ui/tabs/index.ts";

  let tab = $state<"explorer" | "search" | "sourceControl">("explorer");
</script>

<Sidebar.Root
  collapsible="offcanvas"
  class="top-(--header-height) h-[calc(100vh-var(--footer-height)-var(--header-height))]"
>
  <Sidebar.Content>
    <Sidebar.Header>
      <Tabs.Root bind:value={tab} class="mx-auto">
        <Tabs.List>
          <Tabs.Trigger value="explorer">
            <FilesIcon />
          </Tabs.Trigger>
          <Tabs.Trigger value="search">
            <SearchIcon />
          </Tabs.Trigger>
          <Tabs.Trigger value="sourceControl">
            <GitBranchIcon />
          </Tabs.Trigger>
        </Tabs.List>
      </Tabs.Root>
    </Sidebar.Header>
    <Sidebar.Group>
      {#if tab === "explorer"}
        <Sidebar.GroupLabel>Files</Sidebar.GroupLabel>
        <Sidebar.GroupAction>
          <ChevronDownIcon />
        </Sidebar.GroupAction>
        <ContextMenu.Root>
          <ContextMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.GroupContent {...props}>
                <Sidebar.Menu>
                  {#each Object.entries([]) as node}
                    {@render Tree({ node })}
                  {/each}
                </Sidebar.Menu>
              </Sidebar.GroupContent>
            {/snippet}
          </ContextMenu.Trigger>
          <ContextMenu.Content>
            <ContextMenu.Item>New File</ContextMenu.Item>
          </ContextMenu.Content>
        </ContextMenu.Root>
      {:else if tab === "search"}
        <InputGroup.Root></InputGroup.Root>
      {/if}
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>

{#snippet Tree({ node })}
  {let [name, children] = node}
  {#if !children}
    <Sidebar.MenuButton
      isActive={name === "button.svelte"}
      class="data-[active=true]:bg-transparent"
    >
      <FileIcon />
      {name}
    </Sidebar.MenuButton>
  {:else}
    <Sidebar.MenuItem>
      <Collapsible.Root
        class="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
      >
        <Collapsible.Trigger>
          {#snippet child({ props })}
            <Sidebar.MenuButton {...props}>
              <ChevronRightIcon class="transition-transform" />
              <FolderIcon />
              {name}
            </Sidebar.MenuButton>
          {/snippet}
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Sidebar.MenuSub>
            {#each Object.entries(children) as subNode}
              {@render Tree({ node: subNode })}
            {/each}
          </Sidebar.MenuSub>
        </Collapsible.Content>
      </Collapsible.Root>
    </Sidebar.MenuItem>
  {/if}
{/snippet}

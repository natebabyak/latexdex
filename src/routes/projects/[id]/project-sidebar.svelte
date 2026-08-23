<script lang="ts">
  import {
    ArrowBigDownIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    FileIcon,
    FilesIcon,
    FolderIcon,
    FolderOpenIcon,
    GitBranchIcon,
    SearchIcon,
  } from "@lucide/svelte";

  import * as Collapsible from "#lib/components/ui/collapsible/index.ts";
  import * as ContextMenu from "#lib/components/ui/context-menu/index.ts";
  import * as InputGroup from "#lib/components/ui/input-group/index.ts";
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
  import * as Tabs from "#lib/components/ui/tabs/index.ts";
  import { getProject } from "#lib/projects.remote.ts";

  import { getActiveFilePath, setActiveFilePath } from "./project.svelte";

  type FileTree = {
    name: string;
    path: string;
    children?: FileTree[];
  };

  let tab = $state<"explorer" | "search" | "sourceControl">("explorer");

  let { projectId }: { projectId: string } = $props();

  let project = $derived(await getProject({ projectId }));

  let fileTree = $derived.by(() => {
    const root: FileTree[] = [];

    project.files.forEach(({ path }) => {
      const parts = path.split("/");
      let current = root;

      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;
        let node = current.find((node) => node.name === part);

        if (!node) {
          node = {
            name: part,
            path: parts.slice(0, index + 1).join("/"),
            children: isFile ? undefined : [],
          };

          current.push(node);
        }

        if (!isFile && node.children) {
          current = node.children;
        }
      });
    });

    return root;
  });
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
                  {#each fileTree as node}
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
        <InputGroup.Root>
          <InputGroup.Input />
        </InputGroup.Root>
      {/if}
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>

{#snippet Tree({ node }: { node: FileTree })}
  {#if !node.children}
    <Sidebar.MenuButton
      isActive={node.path === getActiveFilePath()}
      onclick={() => setActiveFilePath(node.path)}
    >
      {#if node.name.endsWith(".md")}
        <ArrowBigDownIcon />
      {:else}
        <FileIcon />
      {/if}
      {node.name}
    </Sidebar.MenuButton>
  {:else}
    <Sidebar.MenuItem>
      <Collapsible.Root class="group">
        <Collapsible.Trigger>
          {#snippet child({ props })}
            <Sidebar.MenuButton {...props}>
              <ChevronRightIcon class="group-data-[state=open]:rotate-90" />
              <FolderIcon class="group-data-[state=open]:hidden" />
              <FolderOpenIcon class="not-group-data-[state=open]:hidden" />
              {node.name}
            </Sidebar.MenuButton>
          {/snippet}
        </Collapsible.Trigger>
        <Collapsible.Content>
          <Sidebar.MenuSub>
            {#each node.children as subNode}
              {@render Tree({ node: subNode })}
            {/each}
          </Sidebar.MenuSub>
        </Collapsible.Content>
      </Collapsible.Root>
    </Sidebar.MenuItem>
  {/if}
{/snippet}

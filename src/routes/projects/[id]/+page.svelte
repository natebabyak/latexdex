<script lang="ts">
  import { page } from "$app/state";
  import { XIcon } from "@lucide/svelte";
  import { onMount, type Component } from "svelte";
  import { dndzone, type DndEvent } from "svelte-dnd-action";

  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Empty from "#lib/components/ui/empty/index.ts";
  import * as Resizable from "#lib/components/ui/resizable/index.ts";
  import { getProject } from "#lib/projects.remote.ts";
  import { cn } from "#lib/utils.ts";

  import EditorPane from "./editor-pane.svelte";
  import PdfPane from "./pdf-pane.svelte";

  let project = $derived(
    await getProject({
      projectId: page.params.id,
    }),
  );

  interface Tab {
    id: string;
    label: string;
    Content: Component;
  }

  type Pane = {
    id: string;
    tabs: Tab[];
    activeTabId?: string;
  };

  let panes = $state<Pane[]>([
    {
      id: crypto.randomUUID(),
      tabs: [
        {
          id: crypto.randomUUID(),
          label: "main.tex",
          Content: EditorPane,
        },
        {
          id: crypto.randomUUID(),
          label: "main.tex",
          Content: PdfPane,
        },
      ],
    },
    {
      id: crypto.randomUUID(),
      tabs: [
        {
          id: crypto.randomUUID(),
          label: "main.pdf",
          Content: PdfPane,
        },
      ],
    },
  ]);

  $effect(() => {
    for (const pane of panes) {
      if (!pane.activeTabId) {
        pane.activeTabId = pane.tabs[0].id;
      }
    }
  });

  function handleSortTabs(paneIndex: number, e: CustomEvent<DndEvent<Tab>>) {
    panes[paneIndex].tabs = e.detail.items;
  }
</script>

<svelte:head>
  <title>{project.title} - Texfolia</title>
</svelte:head>

<Resizable.PaneGroup direction="horizontal">
  {#each panes as { tabs, activeTabId }, paneIndex}
    {#if paneIndex !== 0}
      <Resizable.Handle withHandle />
    {/if}
    <Resizable.Pane>
      <header
        use:dndzone={{
          items: tabs,
        }}
        onconsider={(e) => handleSortTabs(paneIndex, e)}
        onfinalize={(e) => handleSortTabs(paneIndex, e)}
        class="bg-muted flex"
      >
        {#each tabs as tab, tabIndex (tab.id)}
          <div
            class={cn(
              "flex items-center",
              tab.id === activeTabId ? "bg-background border-r not-first:border-l" : "border-b",
            )}
          >
            <Button
              disabled={tab.id === activeTabId}
              onclick={() => {
                panes[paneIndex].activeTabId = tab.id;
              }}
              size="xs"
              variant="ghost"
              class="rounded-none not-disabled:opacity-50 disabled:opacity-100"
            >
              {tab.label}
            </Button>
            <Button
              onclick={() => {
                if (panes[paneIndex].tabs.length === 1) {
                  panes.splice(paneIndex, 1);
                } else {
                  panes[paneIndex].tabs.splice(tabIndex, 1);
                }
              }}
              size="icon-xs"
              variant="ghost"
              class="border-none"
            >
              <XIcon />
            </Button>
          </div>
        {/each}
      </header>
      {#each tabs as tab}
        {#if tab.id === activeTabId}
          <tab.Content />
        {/if}
      {/each}
    </Resizable.Pane>
  {:else}
    <Empty.Root>
      <Empty.Media />
      <Empty.Title>No panes</Empty.Title>
      <Empty.Content></Empty.Content>
    </Empty.Root>
  {/each}
</Resizable.PaneGroup>

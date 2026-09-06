<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs";
  import type { Pane } from "$lib/state/panes.svelte";

  import Editor from "./editor.svelte";
  import MarkdownPreview from "./markdown-preview.svelte";
  import PdfPreview from "./pdf-preview.svelte";

  let { pane }: { pane: Pane } = $props();
</script>

<Tabs.Root>
  <Tabs.List>
    {#each pane.tabs as tab (tab.id)}
      <Tabs.Trigger value={tab.id}>
        {tab.filePath}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
  {#each pane.tabs as tab (tab.id)}
    <Tabs.Content value={tab.id}>
      {#if tab.type === "input"}
        <Editor filePath={tab.filePath} />
      {:else}
        {#if tab.filePath.endsWith(".md")}
          <MarkdownPreview filePath={tab.filePath} />
        {:else if tab.filePath.endsWith(".pdf")}
          <PdfPreview filePath={tab.filePath} />
        {/if}
      {/if}
    </Tabs.Content>
  {/each}
</Tabs.Root>

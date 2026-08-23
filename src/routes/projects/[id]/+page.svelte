<script lang="ts">
  import { page } from "$app/state";

  import * as Resizable from "#lib/components/ui/resizable/index.ts";
  import { getProject } from "#lib/projects.remote.ts";

  import EditorPane from "./editor-pane.svelte";
  import PdfPane from "./pdf-pane.svelte";

  let project = $derived(await getProject({ projectId: page.params.id }));
</script>

<svelte:head>
  <title>{project.title} - Texfolia</title>
</svelte:head>

<Resizable.PaneGroup direction="horizontal">
  <Resizable.Pane>
    <EditorPane />
  </Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane>
    <PdfPane />
  </Resizable.Pane>
</Resizable.PaneGroup>

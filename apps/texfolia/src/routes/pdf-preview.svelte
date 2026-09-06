<script lang="ts">
  import PdfViewer from "svelte-pdf";

  let { filePath }: { filePath: string } = $props();
</script>

<PdfViewer url={filePath} />

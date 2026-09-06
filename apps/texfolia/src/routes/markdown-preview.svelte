<script lang="ts">
  import { readTextFile } from "@tauri-apps/plugin-fs";
  import { marked } from "marked";

  let { filePath }: { filePath: string } = $props();

  let html = $state("");

  $effect(() => {
    readTextFile(filePath).then(async (fileContent) => {
      html = await marked.parse(fileContent);
    });
  });
</script>

{@html html}

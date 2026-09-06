<script lang="ts">
  import { json } from "@codemirror/lang-json";
  import { markdown } from "@codemirror/lang-markdown";
  import { yaml } from "@codemirror/lang-yaml";
  import { EditorView, basicSetup } from "codemirror";
  import { latex } from "codemirror-lang-latex";
  import { onDestroy, onMount } from "svelte";

  let editorView: EditorView;
  let editorContainer: HTMLDivElement;

  let { filePath }: { filePath: string } = $props();

  onMount(() => {
    editorView = new EditorView({
      doc: "Hello, World!",
      parent: editorContainer,
      extensions: [
        basicSetup,
        ...(filePath.endsWith(".json")
          ? [json()]
          : filePath.endsWith(".md")
            ? [markdown()]
            : filePath.endsWith(".tex")
              ? [latex()]
              : filePath.endsWith(".yaml")
                ? [yaml()]
                : []),
      ],
    });
  });

  onDestroy(() => {
    if (editorView) {
      editorView.destroy();
    }
  });
</script>

<div bind:this={editorContainer}></div>

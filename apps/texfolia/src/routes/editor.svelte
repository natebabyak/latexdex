<script lang="ts">
  import { EditorView, basicSetup } from "codemirror";
  import { latex } from "codemirror-lang-latex";
  import { onDestroy, onMount } from "svelte";

  let editorView: EditorView;
  let editorContainer: HTMLDivElement;

  onMount(() => {
    editorView = new EditorView({
      doc: "Hello, World!",
      parent: editorContainer,
      extensions: [basicSetup, latex()],
    });
  });

  onDestroy(() => {
    if (editorView) {
      editorView.destroy();
    }
  });
</script>

<div bind:this={editorContainer}></div>

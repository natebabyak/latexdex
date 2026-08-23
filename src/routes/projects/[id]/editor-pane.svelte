<script lang="ts">
  import { page } from "$app/state";
  import { EditorState } from "@codemirror/state";
  import { basicSetup, EditorView } from "codemirror";
  import { latex } from "codemirror-lang-latex";
  import { onDestroy, onMount } from "svelte";
  import { yCollab } from "y-codemirror.next";
  import { WebrtcProvider } from "y-webrtc";
  import * as Y from "yjs";

  // eslint-disable-next-line
  let editorContainer: HTMLDivElement;
  let editorView: EditorView;

  const ydoc = new Y.Doc();
  const provider = new WebrtcProvider(`wss://${page.params.id}.${page.url.origin}`, ydoc);
  const ytext = ydoc.getText("codemirror");
  const undoManager = new Y.UndoManager(ytext);

  provider.awareness.setLocalStateField("user", {
    name: "Anonymous " + Math.floor(Math.random() * 100),
  });

  let editorState = EditorState.create({
    doc: ytext.toJSON(),
    extensions: [basicSetup, latex(), yCollab(ytext, provider.awareness, { undoManager })],
  });

  onMount(() => {
    editorView = new EditorView({
      state: editorState,
      parent: editorContainer,
    });
  });

  onDestroy(() => {
    editorView?.destroy();
    provider.awareness.setLocalStateField("user", null);
    provider.destroy();
    undoManager.destroy();
    ydoc.destroy();
  });
</script>

<div bind:this={editorContainer}></div>

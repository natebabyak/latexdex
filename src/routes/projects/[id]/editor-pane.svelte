<script lang="ts">
  import { page } from "$app/state";
  import { EditorState } from "@codemirror/state";
  import { basicSetup, EditorView } from "codemirror";
  import { latex } from "codemirror-lang-latex";
  import { onDestroy, onMount } from "svelte";
  import { yCollab } from "y-codemirror.next";
  import { WebrtcProvider } from "y-webrtc";
  import * as Y from "yjs";

  import { Button } from "#lib/components/ui/button/index.ts";
  import { updateProjectFile } from "#lib/projects.remote.ts";
  import type { getProject } from "#lib/projects.remote.ts";

  import { getActiveFilePath } from "./project.svelte";

  let {
    project,
  }: {
    project: Awaited<ReturnType<typeof getProject>>;
  } = $props();

  let editorContainer: HTMLDivElement;
  let editorView = $state<EditorView>();

  let currentFilePath = $state<string | null>(null);
  let currentFileId = $state<string | null>(null);

  let currentText = $state("");
  let savedText = $state("");
  let saving = $state(false);
  let saveError = $state<string | null>(null);

  let openRequest = 0;

  let activeFilePath = $derived(getActiveFilePath());

  let activeFile = $derived(
    project.files.find((file) => file.path === activeFilePath) ?? project.files[0],
  );

  let isDirty = $derived(currentText !== savedText);

  let ydoc: Y.Doc | undefined;
  let ytext: Y.Text | undefined;
  let provider: WebrtcProvider | undefined;
  let undoManager: Y.UndoManager | undefined;

  function closeCurrentFile() {
    editorView?.setState(
      EditorState.create({
        doc: "",
        extensions: [basicSetup, latex()],
      }),
    );

    provider?.awareness.setLocalStateField("user", null);
    provider?.destroy();
    undoManager?.destroy();
    ydoc?.destroy();

    provider = undefined;
    undoManager = undefined;
    ytext = undefined;
    ydoc = undefined;
  }

  async function openFile(file: (typeof project.files)[number]) {
    const request = ++openRequest;

    closeCurrentFile();

    currentFilePath = file.path;
    currentFileId = file.id;
    currentText = "";
    savedText = "";
    saveError = null;

    const nextYdoc = new Y.Doc();
    const nextYtext = nextYdoc.getText("codemirror");

    /*
     * The room name contains the file path so every file gets its own
     * collaborative document.
     */
    const roomName = [
      "texfolia",
      "project",
      page.params.id,
      "file",
      encodeURIComponent(file.path),
    ].join(":");

    const nextProvider = new WebrtcProvider(roomName, nextYdoc);

    nextProvider.awareness.setLocalStateField("user", {
      name: "Anonymous " + Math.floor(Math.random() * 100),
    });

    /*
     * Wait for existing collaborators to synchronize before using the
     * database content as the initial Yjs content.
     */
    await new Promise<void>((resolve) => {
      nextProvider.once("synced", () => resolve());
    });

    // Ignore this request if the user selected another file while syncing.
    if (request !== openRequest) {
      nextProvider.destroy();
      nextYdoc.destroy();
      return;
    }

    /*
     * Seed a new collaborative document from the database.
     *
     * The sync must happen first. Otherwise two clients opening an empty
     * Yjs document could both insert the database content and duplicate it.
     */
    if (nextYtext.length === 0 && file.text) {
      nextYtext.insert(0, file.text);
    }

    const nextUndoManager = new Y.UndoManager(nextYtext);

    nextYdoc.on("update", () => {
      currentText = nextYtext.toString();
    });

    ydoc = nextYdoc;
    ytext = nextYtext;
    provider = nextProvider;
    undoManager = nextUndoManager;

    currentText = nextYtext.toString();
    savedText = file.text ?? "";

    editorView?.setState(
      EditorState.create({
        doc: nextYtext.toString(),
        extensions: [
          basicSetup,
          latex(),
          yCollab(nextYtext, nextProvider.awareness, {
            undoManager: nextUndoManager,
          }),
        ],
      }),
    );
  }

  async function save() {
    const fileId = currentFileId;
    if (!fileId || !ytext || !isDirty || saving) return;

    saving = true;
    saveError = null;

    try {
      const text = ytext.toString();

      await updateProjectFile({
        id: fileId,
        text,
      });

      savedText = text;
    } catch (error) {
      saveError = error instanceof Error ? error.message : "Unable to save file";
    } finally {
      saving = false;
    }
  }

  onMount(() => {
    editorView = new EditorView({
      state: EditorState.create({
        doc: "",
        extensions: [basicSetup, latex()],
      }),
      parent: editorContainer,
    });
  });

  $effect(() => {
    const file = activeFile;

    if (!file || file.path === currentFilePath) return;

    void openFile(file);
  });

  onDestroy(() => {
    openRequest++;
    editorView?.destroy();
    closeCurrentFile();
  });
</script>

<header class="flex items-center gap-2 border-b p-2">
  <span>{currentFilePath ?? "No file selected"}</span>

  {#if isDirty}
    <span class="text-muted-foreground text-sm">Unsaved changes</span>
  {/if}

  <Button class="ml-auto" disabled={!isDirty || saving || !currentFileId} onclick={save}>
    {saving ? "Saving..." : "Save"}
  </Button>
</header>

{#if saveError}
  <p class="text-destructive px-2 py-1 text-sm">{saveError}</p>
{/if}

<div bind:this={editorContainer}></div>

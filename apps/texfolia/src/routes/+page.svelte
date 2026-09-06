<script lang="ts">
  import "@xterm/xterm/css/xterm.css";
  import { Button } from "$lib/components/ui/button";
  import * as Resizable from "$lib/components/ui/resizable";
  import PanelLeftIcon from "@lucide/svelte/icons/panel-left";

  import Editor from "./editor.svelte";
  import Terminal from "./terminal.svelte";
</script>

<div class="flex h-screen w-screen flex-col">
  <header class="border-b p-1">
    <Button variant="outline">Sign in with GitHub</Button>
  </header>
  <main class="flex-1">
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane>
        <Editor />
      </Resizable.Pane>
      <Resizable.Handle />
      <Resizable.Pane>
        <Terminal />
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </main>
  <footer class="border-t p-1">
    <Button variant="ghost" size="icon">
      <PanelLeftIcon />
    </Button>
  </footer>
</div>

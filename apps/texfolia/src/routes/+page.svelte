<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index";
  import { Terminal } from "@xterm/xterm";

  const term = new Terminal();
</script>

<header>
    <Button
</header>
<main class="size-screen">
  <Resizable.PaneGroup direction="vertical">
    <Resizable.Pane>
      <div>Hello</div>
    </Resizable.Pane>
    <Resizable.Handle />
    <Resizable.Pane>dawdwa</Resizable.Pane>
  </Resizable.PaneGroup>
</main>
<footer>
    
</footer>
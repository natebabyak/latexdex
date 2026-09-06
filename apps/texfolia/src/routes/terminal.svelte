<script lang="ts">
  import { FitAddon } from "@xterm/addon-fit";
  import { Terminal } from "@xterm/xterm";
  import { onDestroy, onMount } from "svelte";

  let terminal: Terminal;
  let fitAddon: FitAddon;
  let terminalContainer: HTMLDivElement;

  onMount(async () => {
    terminal = new Terminal();

    fitAddon = new FitAddon();
    terminal.loadAddon(fitAddon);

    terminal.open(terminalContainer);
    fitAddon.fit();
  });

  onDestroy(() => {
    if (terminal) {
      terminal.dispose();
    }
  });
</script>

<div bind:this={terminalContainer}></div>

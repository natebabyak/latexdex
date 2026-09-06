<script lang="ts">
  import "@xterm/xterm/css/xterm.css";
  import { Button } from "$lib/components/ui/button";
  import * as Empty from "$lib/components/ui/empty";
  import * as Kbd from "$lib/components/ui/kbd";
  import * as Resizable from "$lib/components/ui/resizable";
  import { Separator } from "$lib/components/ui/separator";
  import { getPanes } from "$lib/state/panes.svelte";
  import CloudDownloadIcon from "@lucide/svelte/icons/cloud-download";
  import FolderIcon from "@lucide/svelte/icons/folder";
  import FolderOpenIcon from "@lucide/svelte/icons/folder-open";
  import PanelLeftIcon from "@lucide/svelte/icons/panel-left";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import SparklesIcon from "@lucide/svelte/icons/sparkles";
  import SquareTerminalIcon from "@lucide/svelte/icons/square-terminal";

  import Pane from "./pane.svelte";
  import Terminal from "./terminal.svelte";
</script>

<div class="flex h-screen w-screen flex-col">
  <header class="border-b p-1">
    <Button variant="outline">Sign in with GitHub</Button>
  </header>
  <main class="flex-1">
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane>
        <Resizable.PaneGroup direction="horizontal">
          {#each getPanes() as pane, paneIndex}
            {#if paneIndex > 0}
              <Resizable.Handle withHandle />
            {/if}
            <Resizable.Pane>
              <Pane {pane} />
            </Resizable.Pane>
          {:else}
            <Empty.Root>
              <Empty.Header>
                <Empty.Title>Texfolia</Empty.Title>
                <Empty.Description>No data found</Empty.Description>
              </Empty.Header>
              <Empty.Content>
                <div class="grid w-full">
                  <div class="flex items-center gap-2">
                    Get Started
                    <Separator class="flex-1" />
                  </div>
                  <Button variant="ghost">
                    <PlusIcon />
                    New File
                    <Kbd.Root class="ml-auto">&#x2318; + N</Kbd.Root>
                  </Button>
                  <Button variant="ghost">
                    <FolderOpenIcon />
                    Open Folder
                    <Kbd.Root class="ml-auto">&#x2318; + O</Kbd.Root>
                  </Button>
                  <Button variant="ghost" class="justify-start">
                    <CloudDownloadIcon />
                    Clone Repository
                  </Button>
                  <div class="mt-4 flex items-center gap-2">
                    Recent Projects
                    <Separator class="flex-1" />
                  </div>
                  {#each [] as project}
                    <Button variant="ghost">
                      <FolderIcon />
                      project name
                    </Button>
                  {/each}
                </div>
              </Empty.Content>
            </Empty.Root>
          {/each}
        </Resizable.PaneGroup>
      </Resizable.Pane>
      <Resizable.Handle withHandle />
      <Resizable.Pane>
        <Terminal />
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </main>
  <footer class="flex items-center border-t p-1">
    <Button variant="ghost" size="icon-sm">
      <PanelLeftIcon />
    </Button>
    <Button variant="ghost" size="icon-sm">
      <SparklesIcon />
    </Button>
    <Button variant="ghost" size="sm" class="ml-auto">12:34</Button>
    <Button variant="ghost" size="sm">Tex</Button>
    <Button variant="ghost" size="icon-sm">
      <SquareTerminalIcon />
    </Button>
  </footer>
</div>

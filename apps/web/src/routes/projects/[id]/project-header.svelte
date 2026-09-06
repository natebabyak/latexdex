<script lang="ts">
  import { resolve } from "$app/paths";
  import {
    ClipboardIcon,
    CopyIcon,
    LogOutIcon,
    Redo2Icon,
    ScissorsIcon,
    Undo2Icon,
  } from "@lucide/svelte";

  import * as Avatar from "#lib/components/ui/avatar/index.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Command from "#lib/components/ui/command/index.ts";
  import * as Dialog from "#lib/components/ui/dialog/index.ts";
  import * as Kbd from "#lib/components/ui/kbd/index.ts";
  import * as Menubar from "#lib/components/ui/menubar/index.ts";
  import * as Tooltip from "#lib/components/ui/tooltip/index.ts";
  import type { getProject } from "#lib/projects.remote.ts";

  import CreateProjectFileDialog from "./create-project-file-dialog.svelte";

  interface ProjectHeaderProps {
    project: Awaited<ReturnType<typeof getProject>>;
  }

  let { project }: ProjectHeaderProps = $props();

  let open = $state(false);
</script>

<header class="flex h-(--header-height) items-center gap-2 border-b px-2">
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        <Button {...props} href={resolve("/projects")} size="icon" variant="ghost">
          <LogOutIcon class="rotate-180" />
        </Button>
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Content>Back to projects</Tooltip.Content>
  </Tooltip.Root>
  <Menubar.Root>
    <Menubar.Menu>
      <Menubar.Trigger>File</Menubar.Trigger>
      <Menubar.Content>
        <CreateProjectFileDialog directory={""} projectId={project.id}>
          <Dialog.Trigger>
            {#snippet child({ props })}
              <Menubar.Item {...props} onSelect={(e) => e.preventDefault()}>
                New File
                <Menubar.Shortcut>&#x2318;N</Menubar.Shortcut>
              </Menubar.Item>
            {/snippet}
          </Dialog.Trigger>
        </CreateProjectFileDialog>
        <Menubar.Item>New Folder</Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Edit</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item>
          <Undo2Icon />
          Undo
          <Menubar.Shortcut>&#x2318;Z</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item>
          <Redo2Icon />
          Redo
          <Menubar.Shortcut>&#x2318;Y</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item>
          <ScissorsIcon />
          Cut
          <Menubar.Shortcut>&#x2318;X</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item>
          <CopyIcon />
          Copy
          <Menubar.Shortcut>&#x2318;C</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Item>
          <ClipboardIcon />
          Paste
          <Menubar.Shortcut>&#x2318;V</Menubar.Shortcut>
        </Menubar.Item>
        <Menubar.Separator />
        <Menubar.Item>
          Select All
          <Menubar.Shortcut>&#x2318;A</Menubar.Shortcut>
        </Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Insert</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Item>Citation</Menubar.Item>
        <Menubar.Item>Figure</Menubar.Item>
        <Menubar.Item>Link</Menubar.Item>
        <Menubar.Item>Symbol</Menubar.Item>
        <Menubar.Item>Table</Menubar.Item>
      </Menubar.Content>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>View</Menubar.Trigger>
    </Menubar.Menu>
    <Menubar.Menu>
      <Menubar.Trigger>Format</Menubar.Trigger>
      <Menubar.Content>
        <Menubar.Sub>
          <Menubar.SubTrigger>Text</Menubar.SubTrigger>
          <Menubar.SubContent align="start">
            <Menubar.Item>
              Bold
              <Menubar.Shortcut>&#x2318;B</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
              Italic
              <Menubar.Shortcut>&#x2318;I</Menubar.Shortcut>
            </Menubar.Item>
          </Menubar.SubContent>
        </Menubar.Sub>
        <Menubar.Sub>
          <Menubar.SubTrigger>Paragraph Styles</Menubar.SubTrigger>
          <Menubar.SubContent align="start">
            <Menubar.Item disabled>Part</Menubar.Item>
            <Menubar.Item disabled>Chapter</Menubar.Item>
            <Menubar.Item>
              Section
              <Menubar.Shortcut>&#x2318;&#x2325;1</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
              Subsection
              <Menubar.Shortcut>&#x2318;&#x2325;2</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
              Subsubsection
              <Menubar.Shortcut>&#x2318;&#x2325;3</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
              Paragraph
              <Menubar.Shortcut>&#x2318;&#x2325;4</Menubar.Shortcut>
            </Menubar.Item>
            <Menubar.Item>
              Subparagraph
              <Menubar.Shortcut>&#x2318;&#x2325;5</Menubar.Shortcut>
            </Menubar.Item>
          </Menubar.SubContent>
        </Menubar.Sub>
      </Menubar.Content>
    </Menubar.Menu>
  </Menubar.Root>
  <Button onclick={() => (open = true)} variant="outline" class="w-full max-w-xs">
    {project.title}
    <Kbd.Root class="ml-auto">&#x2318;&#x2325;P</Kbd.Root>
  </Button>
  <Avatar.Group class="ml-auto"></Avatar.Group>
  <Button>Share</Button>
</header>
<Command.Dialog bind:open>
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>
        <span>Calendar</span>
      </Command.Item>
      <Command.Item>
        <span>Search Emoji</span>
      </Command.Item>
      <Command.Item>
        <span>Calculator</span>
      </Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Settings">
      <Command.Item>
        <span>Profile</span>
        <Command.Shortcut>⌘P</Command.Shortcut>
      </Command.Item>
      <Command.Item>
        <span>Billing</span>
        <Command.Shortcut>⌘B</Command.Shortcut>
      </Command.Item>
      <Command.Item>
        <span>Settings</span>
        <Command.Shortcut>⌘S</Command.Shortcut>
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Dialog>

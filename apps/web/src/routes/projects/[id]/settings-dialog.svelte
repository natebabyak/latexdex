<script lang="ts">
  import {
    CommandIcon,
    CreditCardIcon,
    EyeIcon,
    PaletteIcon,
    PenIcon,
    SettingsIcon,
    SparklesIcon,
    type LucideIcon,
  } from "@lucide/svelte";

  import * as Dialog from "#lib/components/ui/dialog/index.ts";
  import * as Kbd from "#lib/components/ui/kbd/index.ts";
  import * as Sidebar from "#lib/components/ui/sidebar/index.ts";
  import * as Tooltip from "#lib/components/ui/tooltip/index.ts";

  const tabs = [
    {
      Icon: SparklesIcon,
      label: "AI",
    },
    {
      Icon: PaletteIcon,
      label: "Appearance",
    },
    {
      Icon: CreditCardIcon,
      label: "Billing",
    },
    {
      Icon: PenIcon,
      label: "Editor",
    },
    {
      Icon: EyeIcon,
      label: "Preview",
    },
    {
      Icon: SettingsIcon,
      label: "Settings",
    },
    {
      Icon: CommandIcon,
      label: "Shortcuts",
    },
  ] satisfies Array<{
    Icon: LucideIcon;
    label: string;
  }>;

  let activeTab = $state<(typeof tabs)[number]["label"]>(tabs[0].label);
  let open = $state(false);
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>
    {#snippet child({ props })}
      <Tooltip.Root {...props}>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <Sidebar.MenuButton {...props} onclick={() => (open = true)}>
              <SettingsIcon />
              Settings
              <Kbd.Root class="ml-auto">
                <CommandIcon />,
              </Kbd.Root>
            </Sidebar.MenuButton>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content side="right">
          Settings
          <Kbd.Root>
            <CommandIcon />,
          </Kbd.Root>
        </Tooltip.Content>
      </Tooltip.Root>
    {/snippet}
  </Dialog.Trigger>
  <Dialog.Content class="max-h-125 overflow-hidden p-0 md:max-w-2xl" trapFocus={false}>
    <Sidebar.Provider class="items-start">
      <Sidebar.Root collapsible="none" class="hidden md:flex">
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {#each tabs as { Icon, label }}
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton
                      isActive={activeTab === label}
                      onclick={() => (activeTab = label)}
                    >
                      <Icon />
                      {label}
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                {/each}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Root>
      <main>Content</main>
    </Sidebar.Provider>
  </Dialog.Content>
</Dialog.Root>

<script lang="ts">
  import { resolve } from "$app/paths";
  import McpIcon from "@iconify-svelte/bxl/mcp";
  import { BoxesIcon, CircleIcon, PenIcon, PlusIcon, SparklesIcon } from "@lucide/svelte";
  import DatabaseIcon from "@lucide/svelte/icons/database";
  import LogOutIcon from "@lucide/svelte/icons/log-out";
  import PenToolIcon from "@lucide/svelte/icons/pen-tool";
  import SearchIcon from "@lucide/svelte/icons/search";

  import { authClient } from "#lib/auth-client.ts";
  import * as Avatar from "#lib/components/ui/avatar/index.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as DropdownMenu from "#lib/components/ui/dropdown-menu/index.ts";
  import * as Item from "#lib/components/ui/item/index.js";
  import * as Kbd from "#lib/components/ui/kbd/index.ts";
  import * as NavigationMenu from "#lib/components/ui/navigation-menu/index.ts";
  import { navigationMenuTriggerStyle } from "#lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";

  const session = authClient.useSession();
</script>

<header class="flex items-center justify-between border-b p-4">
  <a href={resolve("/")}>
    <CircleIcon />
  </a>
  {#if !$session.data}
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Product</NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <ul class="grid w-lg grid-cols-3">
              <li>
                <Item.Root>
                  {#snippet child({ props })}
                    <NavigationMenu.Link href="/editor" {...props}>
                      <Item.Media variant="image">
                        <div
                          class="bg-primary text-primary-foreground bg-linear-to-b from-white/50 via-transparent to-black/50 p-4"
                        >
                          <PenToolIcon />
                        </div>
                      </Item.Media>
                      <Item.Content>
                        <Item.Title>Editor</Item.Title>
                        <Item.Description>
                          The last markup editor you'll ever want to use
                        </Item.Description>
                      </Item.Content>
                    </NavigationMenu.Link>
                  {/snippet}
                </Item.Root>
              </li>
              <li>
                <Item.Root>
                  {#snippet child({ props })}
                    <NavigationMenu.Link href="/" {...props}>
                      <Item.Media variant="image">
                        <div
                          class="text-primary-foreground bg-linear-to-b from-white/25 via-transparent to-black/25 p-4 shadow"
                        >
                          <DatabaseIcon />
                        </div>
                      </Item.Media>
                      <Item.Content>
                        <Item.Title>Editor</Item.Title>
                        <Item.Description>The last editor you'll ever need</Item.Description>
                      </Item.Content>
                    </NavigationMenu.Link>
                  {/snippet}
                </Item.Root>
              </li>
              <li>
                <Item.Root>
                  {#snippet child({ props })}
                    <NavigationMenu.Link href="/" {...props}>
                      <Item.Media variant="image">
                        <div
                          class="text-primary-foreground bg-orange-700 bg-linear-to-b from-white/25 via-transparent to-black/25 p-4"
                        >
                          <McpIcon />
                        </div>
                      </Item.Media>
                      <Item.Content>
                        <Item.Title>MCP</Item.Title>
                        <Item.Description>Let</Item.Description>
                      </Item.Content>
                    </NavigationMenu.Link>
                  {/snippet}
                </Item.Root>
              </li>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
          <NavigationMenu.Content class="min-w-lg">
            <NavigationMenu.Link>Link</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
        <NavigationMenu.Item>
          <NavigationMenu.Link href="/pricing" class={navigationMenuTriggerStyle()}>
            Pricing
          </NavigationMenu.Link>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  {/if}
  {#if $session.data}
    {let user = $session.data.user}
    <Button href={resolve("/hub")} variant="outline" class="w-full max-w-xs">
      <SearchIcon />
      Search Texfolia
      <Kbd.Root class="ml-auto">&#x2318;K</Kbd.Root>
    </Button>
    <div class="flex items-center gap-2">
      <Button href={resolve("/hub")} variant="outline">
        <SearchIcon />
        Hub
      </Button>
      <Button href={resolve("/projects")} variant="outline">
        <BoxesIcon />
        Projects
      </Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <Avatar.Root {...props}>
              <Avatar.Image src={user.image} alt={`@${user.name}`} />
              <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
            </Avatar.Root>
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end" side="bottom">
          <DropdownMenu.Item>
            {#snippet child({ props })}
              <a {...props} href={resolve("/pricing")}>
                <SparklesIcon />
                Upgrade
              </a>
            {/snippet}
          </DropdownMenu.Item>
          <DropdownMenu.Item onclick={async () => await authClient.signOut()}>
            <LogOutIcon />
            Sign out
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  {:else}
    <Button href={resolve("/sign-in")} size="lg">Get Started</Button>
  {/if}
</header>

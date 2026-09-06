<script lang="ts">
  import PanelLeft from "@lucide/svelte/icons/panel-left";

  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Kbd from "#lib/components/ui/kbd/index.ts";
  import { useSidebar } from "#lib/components/ui/sidebar/context.svelte.ts";
  import * as Tooltip from "#lib/components/ui/tooltip/index.ts";

  const sidebar = useSidebar();
</script>

<footer class="h-(--footer-height) border-t px-1">
  <Tooltip.Root>
    <Tooltip.Trigger>
      {#snippet child({ props })}
        <Button {...props} onclick={sidebar.toggle} size="icon-sm" variant="ghost">
          <PanelLeft />
        </Button>
      {/snippet}
    </Tooltip.Trigger>
    <Tooltip.Content>
      Toggle sidebar
      <Kbd.Root>&#x2318;B</Kbd.Root>
    </Tooltip.Content>
  </Tooltip.Root>
</footer>

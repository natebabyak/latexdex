<script lang="ts">
import BirdIcon from "@lucide/svelte/icons/bird";
import CheckIcon from "@lucide/svelte/icons/check";
import SearchIcon from "@lucide/svelte/icons/search";
import { backOut } from "svelte/easing";
import { fly } from "svelte/transition";
import { getArtifacts } from "#lib/artifacts.remote.ts";
import Footer from "#lib/components/footer.svelte";
import Header from "#lib/components/header.svelte";
import { Button } from "#lib/components/ui/button/index.ts";
import * as Card from "#lib/components/ui/card/index.ts";
import * as Empty from "#lib/components/ui/empty/index.ts";
import * as InputGroup from "#lib/components/ui/input-group/index.ts";
import { Skeleton } from "#lib/components/ui/skeleton/index.ts";
import * as ToggleGroup from "#lib/components/ui/toggle-group/index.ts";
import { ARTIFACT_TYPES } from "#lib/constants.ts";
import { goto } from "$app/navigation";
import { page } from "$app/state";
import CreateArtifactDialog from "./create-artifact-dialog.svelte";

let q = $state(page.url.searchParams.get("q") ?? "");
</script>

<div class="min-h-screen flex flex-col">
  <Header />
  <main class="flex-1">
    <div class="sticky top-4 gap-2 flex-col flex items-center">
      <InputGroup.Root class="max-w-md w-full">
        <InputGroup.Input
          placeholder="Search artifacts..."
          bind:value={q}
          oninput={(e) => goto(`?q=${(e.target as HTMLInputElement).value}`, {
            persistState: true,
            shallow: true
          })}
        />
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup.Root>
      <ToggleGroup.Root size="sm" spacing={2} type="single" variant="outline">
        {#each ARTIFACT_TYPES as artifactType}
          <ToggleGroup.Item
            value={artifactType}
            class="capitalize data-[state=on]:bg-primary data-[state=on]:border-primary data-[state=on]:text-primary-foreground"
          >
            <CheckIcon
              class="scale-0 data-[state=on]:scale-100 transition-transform hidden data-[state=on]:block"
            />
            {artifactType}s
          </ToggleGroup.Item>
        {/each}
      </ToggleGroup.Root>
    </div>
    {#await getArtifacts({ q })}
      <ul class="grid sm:grid-cols-2 grid-cols-1 p-4 gap-4 md:grid-cols-3">
        {#each { length: 20 } as _}
          <li in:fly={{ duration: 300, easing: backOut, y: 8}}>
            <Card.Root class="max-w-sm w-full">
              <Card.Header>
                <Skeleton class="w-full h-4" />
                <Skeleton class="w-full h-3.5" />
              </Card.Header>
              <Card.Content>
                <Skeleton class="w-full h-24" />
              </Card.Content>
            </Card.Root>
          </li>
        {/each}
      </ul>
    {:then artifacts}
      {#if artifacts.length > 0}
        <ul>
          {#each artifacts as { title, description }}
            <li>
              <Card.Root class="max-w-sm w-full">
                <Card.Header>
                  <Card.Title>{title}</Card.Title>
                  <Card.Description>{description}</Card.Description>
                </Card.Header>
              </Card.Root>
            </li>
          {/each}
        </ul>
      {:else}
        <Empty.Root>
          <Empty.Header>
            <Empty.Media variant="icon">
              <BirdIcon />
            </Empty.Media>
            <Empty.Title>No Artifacts Found</Empty.Title>
            <Empty.Description>
              We couldn't find any artifacts matching your search. Maybe this is
              a sign that you should create a new artifact.
            </Empty.Description>
          </Empty.Header>
          <Empty.Content>
            <div class="flex gap-2">
              <CreateArtifactDialog />
              <Button variant="outline">Clear Search</Button>
            </div>
          </Empty.Content>
        </Empty.Root>
      {/if}
    {/await}
  </main>
  <Footer />
</div>

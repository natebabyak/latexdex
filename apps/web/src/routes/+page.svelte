<script lang="ts">
  import { resolve } from "$app/paths";
  import { ArrowRightIcon, ArrowUpRightIcon, CheckIcon } from "@lucide/svelte";

  import Footer from "#lib/components/footer.svelte";
  import Header from "#lib/components/header.svelte";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as HoverCard from "#lib/components/ui/hover-card/index.ts";
  import * as Item from "#lib/components/ui/item/index.ts";
  import { Separator } from "#lib/components/ui/separator/index.ts";
  import * as Table from "#lib/components/ui/table/index.ts";

  const FEATURES = [
    {
      title: "Projects",
      free: "100",
      pro: "Unlimited",
      max: "Unlimited",
    },
    {
      title: "Compile timeout",
      free: "10 s",
      pro: "300 s",
      max: "300 s",
    },
    {
      title: "GitHub integration",
      free: true,
      pro: true,
      max: true,
    },
    {
      title: "Templates via TexfoliaHub",
      free: true,
      pro: true,
      max: true,
    },
    {
      title: "Collaborators",
      free: "Up to 5",
      pro: "Up to 10",
      max: "Unlimited",
    },
  ] satisfies Array<{
    title: string;
    free: boolean | string;
    pro: boolean | string;
    max: boolean | string;
  }>;
</script>

<Header />
<section class="space-y-4">
  <h1 class="max-w-3xl text-5xl leading-tight font-medium tracking-tighter text-balance">
    The markup platform where humans and agents work together
  </h1>
  <p class="text-muted-foreground text-balance">
    Texfolia is a blazingly fast, collaborative, real-time, agentic editor and hub for LaTeX and
    markdown
  </p>
  <div class="flex gap-2">
    <Button href={resolve("/sign-in")} size="lg">
      Get Started
      <ArrowRightIcon />
    </Button>
    <Button href="/pricing" size="lg" variant="outline">See Pricing</Button>
  </div>
</section>
<Separator />
<section>
  <div class="flex">
    <Item.Root>
      <Item.Content>
        <Item.Title>Fast</Item.Title>
        <Item.Description>
          Texfolia is built from the ground up to provide satisfyingly fast performance.
        </Item.Description>
        <Item.Footer>
          <Button size="xs" variant="link" class="pl-0">
            Learn more <ArrowUpRightIcon />
          </Button>
        </Item.Footer>
      </Item.Content>
    </Item.Root>
    <Separator orientation="vertical" />
    <Item.Root>
      <Item.Content>
        <Item.Title>Collaborative</Item.Title>
        <Item.Description>Real-time collaboration. LateXhub. Git integration.</Item.Description>
      </Item.Content>
    </Item.Root>
    <Separator orientation="vertical" />
    <Item.Root>
      <Item.Content>
        <Item.Title>Performance</Item.Title>
        <Item.Description>
          Texfolia is built from the ground up to provide satisfyingly fast performance.
        </Item.Description>
      </Item.Content>
    </Item.Root>
  </div>
</section>
<Separator />
<section class="max-w-5xl">
  <Table.Root class="text-center [&_svg]:mx-auto [&_svg]:size-4 [&_th]:text-center">
    <Table.Header>
      <Table.Row>
        <Table.Head />
        <Table.Head>Free</Table.Head>
        <Table.Head>Pro</Table.Head>
        <Table.Head>Max</Table.Head>
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {#each FEATURES as feature}
        <Table.Row>
          <Table.Cell>{feature.title}</Table.Cell>
          <Table.Cell>{feature.free}</Table.Cell>
          <Table.Cell>{feature.pro}</Table.Cell>
          <Table.Cell>{feature.max}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</section>
<Footer />

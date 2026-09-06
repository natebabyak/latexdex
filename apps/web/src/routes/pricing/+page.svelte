<script lang="ts">
  import { resolve } from "$app/paths";

  import Footer from "#lib/components/footer.svelte";
  import Header from "#lib/components/header.svelte";
  import { Button, type ButtonVariant } from "#lib/components/ui/button/index.ts";
  import * as Card from "#lib/components/ui/card/index.ts";

  interface Plan {
    title: string;
    description: string;
    price: string;
    href: string;
    variant: ButtonVariant;
    buttonText: string;
    features: Array<string>;
  }

  const PLANS = [
    {
      title: "Free",
      description: "Get started with Texfolia",
      price: "0",
      href: resolve("/sign-in"),
      variant: "outline",
      buttonText: "Get started for free",
      features: ["10 projects"],
    },
    {
      title: "Pro",
      description: "For everyday productivity",
      price: "25",
      href: "/sign-up",
      variant: "default",
      buttonText: "Upgrade to Pro",
      features: ["Unlimited projects"],
    },
    {
      title: "Max",
      description: "",
      price: "50",
      href: "/sign-up",
      variant: "outline",
      buttonText: "Upgrade to Max",
      features: [""],
    },
  ] satisfies Array<Plan>;
</script>

<Header />
<main>
  <h1>Pricing</h1>
  <ul class="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
    {#each PLANS as { title, description, price, href, variant, buttonText, features }}
      <li>
        <Card.Root class="max-w-xs">
          <Card.Header>
            <Card.Title>{title}</Card.Title>
            <Card.Description>{description}</Card.Description>
          </Card.Header>
          <Card.Content>
            <span class="text-3xl font-medium tracking-tighter">
              ${price}
            </span>
            <span class="text-muted-foreground">/ mo</span>
            <Button {href} {variant} class="w-full">
              {buttonText}
            </Button>
          </Card.Content>
          <Card.Footer>
            <p></p>
            <ul>
              {#each features as feature}
                <li>{feature}</li>
              {/each}
            </ul>
          </Card.Footer>
        </Card.Root>
      </li>
    {/each}
  </ul>
</main>
<Footer />

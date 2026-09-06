<script lang="ts">
  import { resolve } from "$app/paths";
  import GithubIcon from "@iconify-svelte/bxl/github";
  import GoogleIcon from "@iconify-svelte/bxl/google";
  import { cubicInOut } from "svelte/easing";
  import { scale } from "svelte/transition";

  import { authClient } from "#lib/auth-client.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Card from "#lib/components/ui/card/index.ts";
  import * as Field from "#lib/components/ui/field/index.ts";

  import type { PageProps } from "./$types";
  import EmailForm from "./email-form.svelte";
  import OtpForm from "./otp-form.svelte";
  import UsernameForm from "./username-form.svelte";

  let { data }: PageProps = $props();

  let step = $derived<"email" | "otp" | "username">(
    !data.user?.emailVerified ? "otp" : !data.user.username ? "username" : "email",
  );
</script>

<Card.Root class="absolute top-1/2 left-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2">
  <Card.Content>
    {#key step}
      <div
        transition:scale={{
          delay: 150,
          duration: 300,
          easing: cubicInOut,
          start: 0.9,
          opacity: 0,
        }}
      >
        <Field.Group>
          {#if step === "email"}
            <EmailForm />
            <Field.Separator>or</Field.Separator>
            <Field.Field>
              <Button
                onclick={async () =>
                  await authClient.signIn.social({
                    provider: "github",
                  })}
                size="lg"
                variant="outline"
              >
                <GithubIcon />
                Continue with GitHub
              </Button>
              <Button
                onclick={async () =>
                  await authClient.signIn.social({
                    provider: "google",
                  })}
                size="lg"
                variant="outline"
              >
                <GoogleIcon />
                Continue with Google
              </Button>
            </Field.Field>
          {:else if step === "otp"}
            <OtpForm />
            <Button onclick={() => (step = "email")} size="lg" variant="ghost">
              Back to login
            </Button>
          {:else if step === "username"}
            <UsernameForm />
            <Button href={resolve("/projects")} size="lg" variant="ghost">Skip for now</Button>
          {/if}
        </Field.Group>
      </div>
    {/key}
  </Card.Content>
</Card.Root>
<footer>
  <p>
    <a href={resolve("/terms")}>Terms of Service</a>
    and
    <a href={resolve("/privacy")}>Privacy Policy</a>
  </p>
</footer>

<script lang="ts">
  import { resolve } from "$app/paths";
  import GithubIcon from "@iconify-svelte/bxl/github";
  import GoogleIcon from "@iconify-svelte/bxl/google";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
  import { createForm, formOptions } from "@tanstack/svelte-form";
  import { toast } from "svelte-sonner";
  import z from "zod";

  import { authClient } from "#lib/auth-client.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Field from "#lib/components/ui/field/index.ts";
  import { Input } from "#lib/components/ui/input/index.ts";
  import { Spinner } from "#lib/components/ui/spinner/index.ts";

  const schema = z.object({
    email: z.email(),
  });

  const formOpts = formOptions({
    defaultValues: {
      email: "",
    },
    validators: {
      onMount: schema,
      onChange: schema,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.emailOtp.sendVerificationOtp({
        email: value.email,
        type: "sign-in",
      });

      if (error) {
        toast.error("error");
        return;
      }
    },
  });

  const form = createForm(() => formOpts);
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    form.handleSubmit();
  }}
>
  <Field.Set>
    <form.Field name="email">
      {#snippet children(field)}
        <Field.Field>
          <Field.Label>Email</Field.Label>
          <Input
            autocapitalize="off"
            autocomplete="email"
            autocorrect="off"
            autofocus
            name={field.name}
            onblur={field.handleBlur}
            placeholder="Your email address"
            value={field.state.value}
            oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
          />
        </Field.Field>
      {/snippet}
    </form.Field>
    <Field.Field>
      <form.Subscribe
        selector={(state) => ({
          canSubmit: state.canSubmit,
          isSubmitting: state.isSubmitting,
          isTouched: state.isTouched,
        })}
      >
        {#snippet children({ canSubmit, isSubmitting, isTouched })}
          <Button disabled={!isTouched || !canSubmit || isSubmitting} size="lg" type="submit">
            {#if isSubmitting}
              <Spinner />
            {:else}
              Continue with email
            {/if}
          </Button>
        {/snippet}
      </form.Subscribe>
    </Field.Field>
  </Field.Set>
</form>

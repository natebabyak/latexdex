<script lang="ts">
  import Check from "@lucide/svelte/icons/check";
  import X from "@lucide/svelte/icons/x";
  import { createForm } from "@tanstack/svelte-form";
  import { toast } from "svelte-sonner";
  import z from "zod";

  import { authClient } from "#lib/auth-client.ts";
  import { Badge } from "#lib/components/ui/badge/index.ts";
  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Field from "#lib/components/ui/field/index.ts";
  import * as InputGroup from "#lib/components/ui/input-group/index.ts";
  import { Spinner } from "#lib/components/ui/spinner/index.ts";

  const schema = z.object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(30, "Username must be at most 30 characters")
      .regex(
        /^[\w.]+$/,
        "Username must contain only alphanumeric characters, underscores, and dots",
      ),
  });

  const form = createForm(() => ({
    defaultValues: {
      username: "",
    },
    validators: {
      onMount: schema,
      onChange: schema,
      onChangeAsync: async ({ value }) => {
        const result = schema.safeParse(value);

        if (!result.success) {
          return;
        }

        const { data, error } = await authClient.isUsernameAvailable({
          username: value.username,
        });

        if (error || !data.available) {
          return "";
        }

        return;
      },
      onChangeAsyncDebounceMs: 100,
    },
    onSubmit: async ({ value }) => {
      const { error } = await authClient.updateUser({
        username: value.username,
      });

      if (error) {
        toast.error("Failed to ");
      }
    },
  }));
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    form.handleSubmit();
  }}
>
  <Field.Set>
    <form.Field name="username">
      {#snippet children(field)}
        <Field.Field>
          <Field.Label for={field.name}>Your Username</Field.Label>
          <InputGroup.Root>
            <InputGroup.Input
              autocapitalize="off"
              autocomplete="username"
              autocorrect="off"
              autofocus
              id={field.name}
              name={field.name}
              onblur={field.handleBlur}
              placeholder="Enter your username"
              value={field.state.value}
              oninput={(e) => field.handleChange((e.target as HTMLInputElement).value)}
            />
            <InputGroup.Addon align="inline-end">
              {#if !field.state.meta.errors}
                <Badge variant="secondary" class="bg-blue-500/10 text-blue-500">
                  <Check />
                  Available
                </Badge>
              {:else}
                <Badge variant="destructive">
                  <X />
                  Unavailable
                </Badge>
              {/if}
            </InputGroup.Addon>
          </InputGroup.Root>
          <Field.Error>
            {field.state.meta.errors.at(0)?.message}
          </Field.Error>
        </Field.Field>
      {/snippet}
    </form.Field>
    <form.Subscribe
      selector={(state) => ({
        canSubmit: state.canSubmit,
        isSubmitting: state.isSubmitting,
      })}
    >
      {#snippet children({ canSubmit, isSubmitting })}
        <Button disabled={!canSubmit || isSubmitting} size="lg">Continue</Button>
      {/snippet}
    </form.Subscribe>
  </Field.Set>
</form>

<script lang="ts">
  import { createForm, formOptions } from "@tanstack/svelte-form";

  import { Button } from "#lib/components/ui/button/index.ts";
  import * as Field from "#lib/components/ui/field/index.ts";
  import * as InputOTP from "#lib/components/ui/input-otp/index.ts";

  const formOpts = formOptions({
    defaultValues: {
      otp: "",
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
  <Field.Field>
    <Field.Label>One-Time Password</Field.Label>
    <InputOTP.Root maxlength={6}>
      {#snippet children({ cells })}
        <InputOTP.Group>
          {#each cells.slice(0, 3) as cell (cell)}
            <InputOTP.Slot {cell} />
          {/each}
        </InputOTP.Group>
        <InputOTP.Separator />
        <InputOTP.Group>
          {#each cells.slice(3, 6) as cell (cell)}
            <InputOTP.Slot {cell} />
          {/each}
        </InputOTP.Group>
      {/snippet}
    </InputOTP.Root>
    <Field.Description>Check your email for your one-time password</Field.Description>
  </Field.Field>
</form>
<Button>Resend one-time password</Button>

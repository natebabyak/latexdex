"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";

const schema = z.object({
  email: z.email(),
  password: z.string(),
  rememberMe: z.boolean(),
});

export function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      rememberMe: true,
      callbackURL: "/",
    });
  }

  return (
    <form
      id="sign-in-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4"
    >
      <FieldGroup className="grid gap-4">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-in-form-email">Email</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                autoComplete="email"
                {...field}
                id="sign-in-form-email"
                placeholder="you@example.com"
                type="email"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-in-form-password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  aria-invalid={fieldState.invalid}
                  autoComplete="current-password"
                  {...field}
                  id="sign-in-form-password"
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                  type={showPassword ? "text" : "password"}
                />
                <InputGroupAddon align="inline-end">
                  <InputGroupButton
                    onClick={toggleShowPassword}
                    size="icon-xs"
                    variant="outline"
                  >
                    <Eye
                      className={cn(
                        "scale-100 transition-transform",
                        showPassword && "scale-0",
                      )}
                    />
                    <EyeOff
                      className={cn(
                        "absolute scale-0 transition-transform",
                        showPassword && "scale-100",
                      )}
                    />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit">Sign in</Button>
    </form>
  );
}

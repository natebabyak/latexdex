"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
});

export function SignUpForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    await authClient.signUp.email({
      name: values.name,
      email: values.email,
      password: values.password,
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
        },
      },
    });
  }

  return (
    <form
      id="sign-up-form"
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid gap-4"
    >
      <FieldGroup className="grid gap-4">
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-up-form-name">Name</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                autoComplete="name"
                {...field}
                id="sign-up-form-name"
                placeholder="John Doe"
                type="text"
              />
              <FieldDescription className="text-xs">
                This is your display name
              </FieldDescription>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="sign-up-form-email">Email</FieldLabel>
              <Input
                aria-invalid={fieldState.invalid}
                autoComplete="email"
                {...field}
                id="sign-up-form-email"
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
              <FieldLabel htmlFor="sign-up-form-password">Password</FieldLabel>
              <InputGroup>
                <InputGroupInput
                  aria-invalid={fieldState.invalid}
                  autoComplete="new-password"
                  {...field}
                  id="sign-up-form-password"
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
      <Button type="submit">Sign up</Button>
    </form>
  );
}

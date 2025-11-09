"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Github } from "@/components/icons/github";
import { Google } from "@/components/icons/google";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z
  .object({
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
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Card className="mx-auto w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign up</CardTitle>
        <CardDescription>
          Create an account to access additonal features
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="you@domain.com"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                          type={showPassword ? "text" : "password"}
                        />
                        <InputGroupAddon align="inline-end">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InputGroupButton
                                onClick={toggleShowPassword}
                                size="icon-xs"
                                variant="outline"
                              >
                                <EyeOff
                                  className={cn(
                                    "scale-100 transition-transform",
                                    showPassword && "scale-0",
                                  )}
                                />
                                <Eye
                                  className={cn(
                                    "absolute scale-0 transition-transform",
                                    showPassword && "scale-100",
                                  )}
                                />
                              </InputGroupButton>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>
                                {showPassword
                                  ? "Hide passwords"
                                  : "Show passwords"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm password</FormLabel>
                    <FormControl>
                      <InputGroup>
                        <InputGroupInput
                          {...field}
                          placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                          type={showPassword ? "text" : "password"}
                        />
                        <InputGroupAddon align="inline-end">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <InputGroupButton
                                onClick={toggleShowPassword}
                                size="icon-xs"
                                variant="outline"
                              >
                                <EyeOff
                                  className={cn(
                                    "scale-100 transition-transform",
                                    showPassword && "scale-0",
                                  )}
                                />
                                <Eye
                                  className={cn(
                                    "absolute scale-0 transition-transform",
                                    showPassword && "scale-100",
                                  )}
                                />
                              </InputGroupButton>
                            </TooltipTrigger>
                            <TooltipContent side="top">
                              <p>
                                {showPassword
                                  ? "Hide passwords"
                                  : "Show passwords"}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Sign up</Button>
            </form>
          </Form>
          <div className="relative">
            <Separator />
            <span className="bg-card text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs font-medium">
              or
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => {
                authClient.signIn.social({
                  provider: "github",
                });
              }}
              variant="outline"
            >
              <Github />
              Continue with GitHub
            </Button>
            <Button
              onClick={() => {
                authClient.signIn.social({
                  provider: "google",
                });
              }}
              variant="outline"
            >
              <Google />
              Continue with Google
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <p className="text-muted-foreground text-xs">
          Already have an account?{" "}
          <Link href="/sign-in" className="underline-offset-4 hover:underline">
            Sign in{" "}
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}

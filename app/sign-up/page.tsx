"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
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
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardAction>
          <span className="text-xs">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="underline-offset-4 hover:underline"
            >
              Sign in{" "}
            </Link>
          </span>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
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
          <div className="relative">
            <Separator />
            <span className="bg-card text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs font-medium">
              or
            </span>
          </div>
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
                          <InputGroupButton
                            onClick={handleClick}
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
                        </InputGroupAddon>
                      </InputGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Submit</Button>
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}

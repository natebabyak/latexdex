import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GithubButton } from "@/components/github-button";
import { GoogleButton } from "@/components/google-button";
import Link from "next/link";
import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = {
  title: "Sign in | LaTeXdex",
  description: "Sign in to your account",
};

export default function SignIn() {
  return (
    <main className="flex h-dvh items-center">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-normal">Welcome back</CardTitle>
          <CardDescription className="text-xs">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="flex flex-col gap-4">
          <SignInForm />
          <div className="relative">
            <Separator />
            <span className="bg-card text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs font-medium">
              or
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <GithubButton />
            <GoogleButton />
          </div>
        </CardContent>
        <Separator />
        <CardFooter className="flex-col gap-2">
          <p className="text-muted-foreground text-xs">
            Don&apos;t have an account?{" "}
            <Link
              href="/sign-up"
              className="underline-offset-4 hover:underline"
            >
              Sign up now{" "}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}

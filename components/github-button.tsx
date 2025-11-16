"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Github } from "@/components/icons/github";

export function GithubButton() {
  const handleClick = () => {
    authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <Button onClick={handleClick} variant="outline">
      <Github />
      Continue with GitHub
    </Button>
  );
}

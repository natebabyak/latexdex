"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Google } from "@/components/icons/google";

export function GoogleButton() {
  const handleClick = () => {
    authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Button onClick={handleClick} variant="outline">
      <Google />
      Continue with Google
    </Button>
  );
}

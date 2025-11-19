"use client";

import { authClient } from "@/lib/auth-client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

export function SignOutButton() {
  const handleClick = async () => {
    await authClient.signOut();
  };

  return (
    <DropdownMenuItem onClick={handleClick}>
      <LogOut />
      Sign out
    </DropdownMenuItem>
  );
}

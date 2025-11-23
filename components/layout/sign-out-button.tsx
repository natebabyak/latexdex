"use client";

import { authClient } from "@/lib/auth-client";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();

  const signOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <DropdownMenuItem onClick={signOut}>
      <LogOut />
      Sign out
    </DropdownMenuItem>
  );
}

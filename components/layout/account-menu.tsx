import { auth } from "@/lib/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { headers } from "next/headers";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { SignOutButton } from "./sign-out-button";
import { Palette, Star, User2 } from "lucide-react";

export async function AccountMenu() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button asChild variant="outline">
          <Link href="/sign-in">Sign in</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign up</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={session.user?.image || undefined} />
          <AvatarFallback asChild>
            <Skeleton />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-full max-w-sm"
      >
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={session.user?.image || undefined} />
              <AvatarFallback asChild>
                <Skeleton />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">
                {session.user.name || "User"}
              </span>
              <span className="text-muted-foreground text-xs">
                {session.user.email || ""}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User2 /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Star />
            Stars
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Palette />
            Appearance
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

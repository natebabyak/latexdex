"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Bookmark,
  Braces,
  History,
  LogOut,
  Monitor,
  Moon,
  Settings,
  Sun,
  User2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function AccountMenu() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { setTheme, theme } = useTheme();

  const signOut = async () => {
    await authClient.signOut();
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src={session?.user.image || undefined} />
          <AvatarFallback asChild>
            <Skeleton />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="bottom">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src={session?.user.image || undefined} />
              <AvatarFallback asChild>
                <Skeleton />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{session?.user.name}</span>
              <span className="text-muted-foreground text-xs">
                {session?.user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <User2 />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/search">
              <Braces />
              Entries
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/search">
              <Bookmark />
              Bookmarks
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/search">
              <History />
              History
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Sun
                className={cn(
                  "scale-0 transition-transform!",
                  theme === "light" && "scale-100",
                )}
              />
              <Moon
                className={cn(
                  "absolute scale-0 transition-transform!",
                  theme === "dark" && "scale-100",
                )}
              />
              <Monitor
                className={cn(
                  "absolute scale-0 transition-transform!",
                  theme === "system" && "scale-100",
                )}
              />
              Theme
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setTheme("light");
                }}
              >
                <Sun />
                Light
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setTheme("dark");
                }}
              >
                <Moon />
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  setTheme("system");
                }}
              >
                <Monitor />
                System
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

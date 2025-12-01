"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  FileHeart,
  FileUp,
  FolderUp,
  Heart,
  History,
  LogOut,
  Moon,
  Settings,
  Sun,
  User2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

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
              <FileUp />
              My Entries
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/search">
              <FolderUp />
              My Collections
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/search">
              <FileHeart />
              Saved Entries
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Heart />
              Saved
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/">
              <History />
              Recent
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <Settings />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={(event) => {
              event.preventDefault();
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          >
            <Sun className="scale-100 rotate-0 transition-transform! dark:scale-0 dark:rotate-90" />
            <Moon className="absolute scale-0 rotate-90 transition-transform! dark:scale-100 dark:rotate-0" />
            Toggle theme
          </DropdownMenuItem>
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

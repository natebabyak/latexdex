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
  FolderHeart,
  FolderUp,
  LogOut,
  Moon,
  Settings,
  Sun,
  User2,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export function AccountMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-full max-w-sm"
      >
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
            <Link href={`/profile/${session?.user.id}`}>
              <User2 />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileUp />
            My Entries
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FolderUp />
            My Collections
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FileHeart />
            Saved Entries
          </DropdownMenuItem>
          <DropdownMenuItem>
            <FolderHeart />
            Saved Collections
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleTheme}>
            <Sun className="scale-100 rotate-0 dark:scale-0 dark:rotate-90" />
            <Moon className="absolute scale-0 rotate-90 dark:scale-100 dark:rotate-0" />
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

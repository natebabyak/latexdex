import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Latexdex } from "@/components/icons/latexdex";
import { BookDashed, LogOut, Omega, Search, Sigma } from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const databaseItems = [
  {
    href: "/search?type=formulas",
    icon: Sigma,
    title: "Formulas",
  },
  {
    href: "/search?type=symbols",
    icon: Omega,
    title: "Symbols",
  },
  {
    href: "/search?type=templates",
    icon: BookDashed,
    title: "Templates",
  },
];

export async function Header() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="w-full p-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 xl:px-0">
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/">
              <Latexdex />
              LaTeXdex
            </Link>
          </Button>
          <NavigationMenu viewport={true}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Database</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] grid-cols-2 gap-2">
                    <li className="row-span-3 h-full">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/search"
                          className="flex h-full flex-row items-center gap-2"
                        >
                          <div className="bg-background rounded-md border p-2">
                            <Search />
                          </div>
                          Search
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    {databaseItems.map((item, i) => (
                      <li key={i}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="flex flex-row items-center gap-2"
                          >
                            <div className="bg-background rounded-md border p-2">
                              <item.icon />
                            </div>
                            {item.title}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/pricing">Pricing</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={session.user.image || undefined} />
                <AvatarFallback asChild>
                  <Skeleton className="size-8 rounded-full" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="bottom" className="w-lg">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Billing
                  <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Keyboard shortcuts
                  <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut />
                Sign out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost">
              <Link href="/sign-in">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">Sign up</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}

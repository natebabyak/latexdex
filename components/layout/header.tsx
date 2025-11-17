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
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Latexdex } from "@/components/icons/latexdex";
import { BookDashed, Omega, Search, Sigma } from "lucide-react";

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
          <Button asChild size="icon" variant="ghost">
            <Link href="/">
              <Latexdex />
            </Link>
          </Button>
          <NavigationMenu viewport={true}>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Database</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[500px] grid-cols-2 gap-2">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/search"
                          className="flex items-center gap-2"
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
                            className="flex items-center gap-2"
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
                <AvatarImage src={undefined} />
                <AvatarFallback asChild>
                  <Skeleton className="size-8 rounded-full" />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>hello</DropdownMenuContent>
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

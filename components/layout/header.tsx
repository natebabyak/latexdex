import Link from "next/link";
import { AccountMenu } from "./account-menu";
import { Layers, Plus, PlusCircle } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="bg-background fixed top-0 z-50 w-full p-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 xl:px-0">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Layers />
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/search">Database</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/editor">Tools</Link>
                </NavigationMenuLink>
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
          <Button asChild>
            <Link href="/new">
              <Plus />
              Create New
            </Link>
          </Button>
        </div>
        <AccountMenu />
      </div>
    </header>
  );
}

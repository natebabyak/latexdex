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
import { Latexdex } from "@/components/icons/latexdex";

export function Header() {
  return (
    <header className="w-full p-4">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 xl:px-0">
        <NavigationMenu viewport={true}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">
                  <Latexdex />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Formulas</NavigationMenuTrigger>
              <NavigationMenuContent></NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Symbols</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"></ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Templates</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"></ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/contribute">Contribute</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link href="/sign-in">Sign in</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-up">Sign up</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

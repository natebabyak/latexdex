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
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Github } from "lucide-react";

export function Header() {
  return (
    <header className="w-full p-4">
      <div className="flex items-center justify-between">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">LaTeXdex</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/docs">Docs</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            Search...
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
          <div className="flex items-center">
            <Button size="icon" title="GitHub" variant="ghost">
              <a href="https://github.com/natebabyak/latexdex" target="_blank">
                <Github />
              </a>
            </Button>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
}

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { BookDashed, Omega, Search, Sigma } from "lucide-react";
import { Latexdex } from "@/components/icons/latexdex";

interface NavItemProps {
  href: string;
  Icon: React.ComponentType;
  title: string;
  description: string;
}

function NavItem({ href, Icon, title, description }: NavItemProps) {
  return (
    <NavigationMenuLink asChild className="group">
      <Link href={href} className="flex flex-row items-center gap-2">
        <div className="bg-background rounded-md border p-2 group-hover:border-[#00c1ff]">
          <Icon />
        </div>
        <div className="flex flex-col">
          <span className="font-medium">{title}</span>
          <span className="text-muted-foreground text-xs">{description}</span>
        </div>
      </Link>
    </NavigationMenuLink>
  );
}

const databaseItems: NavItemProps[] = [
  {
    href: "/search?type=formulas",
    Icon: Sigma,
    title: "Formulas",
    description: "To be described",
  },
  {
    href: "/search?type=symbols",
    Icon: Omega,
    title: "Symbols",
    description: "Search for mathematical symbols",
  },
  {
    href: "/search?type=templates",
    Icon: BookDashed,
    title: "Templates",
    description: "Search for document templates",
  },
];

const toolsItems: NavItemProps[] = [];

export function Nav() {
  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/">
              <div className="flex items-center gap-2">
                <Latexdex />
                LaTeXdex
              </div>
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Database</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[500px] grid-cols-2 gap-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    href="/search"
                    className="flex flex-row items-center gap-2"
                  >
                    <div className="bg-background rounded-md border p-2">
                      <Search />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">Search</span>
                      <span className="text-muted-foreground text-xs">
                        Search for documents
                      </span>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              {databaseItems.map((item, i) => (
                <li key={i}>
                  <NavItem {...item} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
          <NavigationMenuContent></NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

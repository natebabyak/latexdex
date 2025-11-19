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
import {
  BookDashed,
  Calculator,
  Omega,
  Ruler,
  Search,
  Sigma,
  Table2,
  TextCursor,
} from "lucide-react";
import { Latexdex } from "@/components/icons/latexdex";
import { cn } from "@/lib/utils";
import { Github } from "@/components/icons/github";

interface NavItemProps {
  href: string;
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

interface NavSectionProps {
  title: string;
  items: NavItemProps[];
}

const navSections: NavSectionProps[] = [
  {
    title: "Database",
    items: [
      {
        href: "/search",
        Icon: Search,
        title: "Search the Database",
        description: "Formula, symbols, templates, and everything in between",
      },
      {
        href: "/search?type=formulas",
        Icon: Sigma,
        title: "Formulas",
        description: "Search for engineerng,",
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
    ],
  },
  {
    title: "Tools",
    items: [
      {
        href: "/editor",
        Icon: TextCursor,
        title: "LaTeX Editor",
        description: "Opinionated LaTeX editor with live preview",
      },
      {
        href: "/calculator",
        Icon: Calculator,
        title: "Scientific Calculator",
        description: "A calculator for scientific equations and formulas",
      },
      {
        href: "/siunitx-editor",
        Icon: Ruler,
        title: "siunitx Editor",
        description: "",
      },
      {
        href: "/table-editor",
        Icon: Table2,
        title: "Table Generator",
        description: "",
      },
      {
        href: "/tikz-editor",
        Icon: Ruler,
        title: "TikZ Editor",
        description: "",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        href: "/guides",
        Icon: BookDashed,
        title: "Guides & Tutorials",
        description: "Learn LaTeX with our comprehensive guides",
      },
      {
        href: "https://github.com/natebabyak/latexdex",
        Icon: Github,
        title: "GitHub Repository",
        description: "Contribute to the project on GitHub",
      },
    ],
  },
];

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
        {navSections.map((section, i) => (
          <NavigationMenuItem key={i}>
            <NavigationMenuTrigger>{section.title}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[500px] grid-cols-2 gap-2">
                {section.items.map((item, i) => (
                  <li key={i} className={cn(i === 0 && `row-span-4`)}>
                    <NavigationMenuLink asChild className="h-full">
                      <Link
                        href={item.href}
                        className="group flex flex-row items-center gap-2"
                      >
                        <div className="bg-background rounded-md border p-2 text-[#00c1ff]! transition-colors group-hover:border-[#00c1ff]">
                          <item.Icon />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-medium">{item.title}</span>
                          <span className="text-muted-foreground text-xs">
                            {item.description}
                          </span>
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/pricing">Pricing</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

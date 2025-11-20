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
  Scissors,
  Scroll,
  Search,
  Sigma,
  Sparkles,
  Table2,
  TextCursor,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavMenuItemProps {
  href: string;
  Icon: React.ComponentType;
  title: string;
  description: string;
}

interface NavMenuSubsectionProps {
  title: string;
  items: NavMenuItemProps[];
}

interface NavMenuSectionProps {
  title: string;
  subsections: NavMenuSubsectionProps[];
}

const navMenuSections: NavMenuSectionProps[] = [
  {
    title: "Database",
    subsections: [
      {
        title: "Search",
        items: [
          {
            href: "/search",
            Icon: Search,
            title: "Search",
            description: "Instant, accurate results",
          },
          {
            href: "/search",
            Icon: Sparkles,
            title: "Smart Search",
            description: "Natural language search",
          },
        ],
      },
      {
        title: "Snippets",
        items: [
          {
            href: "/search?type=snippets",
            Icon: Scissors,
            title: "All Snippets",
            description: "Browse all LaTeX snippets",
          },
          {
            href: "/search?type=snippets&category=formulas",
            Icon: Sigma,
            title: "Formulas",
            description: "Browse LaTeX formulas",
          },
          {
            href: "/search?type=snippets&category=symbols",
            Icon: Omega,
            title: "Symbols",
            description: "Browse LaTeX symbols",
          },
        ],
      },
      {
        title: "Templates",
        items: [
          {
            href: "/templates",
            Icon: Scroll,
            title: "All Templates",
            description: "Browse all LaTeX templates",
          },
          {
            href: "/search?type=templates",
            Icon: BookDashed,
            title: "Templates",
            description: "Search for document templates",
          },
        ],
      },
    ],
  },
  {
    title: "Tools",
    subsections: [
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
            href: "/scientific",
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
    ],
  },
];

function NavMenuItem({ href, Icon, title, description }: NavMenuItemProps) {
  return (
    <li>
      <NavigationMenuLink asChild className="h-full">
        <Link
          href={href}
          className="group/item flex flex-row items-center gap-2"
        >
          <div className="bg-background group-hover/item:bg-primary-foreground rounded-md border p-2 transition-colors">
            <Icon />
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{title}</span>
            <span className="text-muted-foreground text-xs">{description}</span>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

function NavMenuSubsection({ title, items }: NavMenuSubsectionProps) {
  return (
    <li className="grid gap-1">
      <span className="text-muted-foreground text-xs font-medium">{title}</span>
      <ul className="grid gap-2">
        {items.map((item) => (
          <NavMenuItem {...item} key={item.title} />
        ))}
      </ul>
    </li>
  );
}

function NavMenuSection({ title, subsections }: NavMenuSectionProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{title}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul
          className={cn(
            "grid w-[500px] gap-2 p-2",
            `grid-cols-${subsections.length}`,
          )}
        >
          {subsections.map((subsection) => (
            <NavMenuSubsection {...subsection} key={subsection.title} />
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

export function NavMenu() {
  return (
    <NavigationMenu viewport={true}>
      <NavigationMenuList>
        {navMenuSections.map((section) => (
          <NavMenuSection {...section} key={section.title} />
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

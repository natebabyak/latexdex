import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ModifierKbd } from "@/components/modifier-kbd";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { Separator } from "@/components/ui/separator";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <article>
          <div className="grid gap-2 text-center">
            <h1 className="text-7xl font-bold">LaTeXdex</h1>
            <p className="text-muted-foreground text-lg">
              The free and open-source LaTeX database
            </p>
          </div>
          <div className="mx-auto grid gap-2">
            <InputGroup className="mx-auto w-full max-w-sm">
              <InputGroupAddon align="inline-start">
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
              <InputGroupAddon align="inline-end">
                <KbdGroup>
                  <ModifierKbd />
                  <Kbd>K</Kbd>
                </KbdGroup>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <Separator />

          <Separator />
        </article>
      </main>
      <Footer />
    </>
  );
}

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { ArrowRight, Search } from "lucide-react";

export default function Home() {
  return (
    <>
      <Header />
      <main className="text-center">
        <h1 className="text-7xl font-bold">LaTeXdex</h1>
        <p className="text-muted-foreground">
          The free and open-source LaTeX database
        </p>
        <ButtonGroup>
          <ButtonGroup>
            <InputGroup>
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
              <InputGroupInput placeholder="Search..." />
            </InputGroup>
          </ButtonGroup>
          <ButtonGroup>
            <Button size="icon" variant="outline">
              <ArrowRight />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </main>
      <Footer />
    </>
  );
}

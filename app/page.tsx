import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Separator } from "@/components/ui/separator";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import { Info, Search } from "lucide-react";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/search");
  }

  return (
    <>
      <Header />
      <main className="pt-17">
        <article>
          <div className="flex flex-col gap-2 text-center">
            <h1 className="line-clamp-2 text-5xl font-semibold text-balance">
              The community-driven LaTeX database
            </h1>
            <p className="text-muted-foreground line-clamp-2 text-balance">
              Focus on real work, not typing. LaTeXdex is the best place to
              search and discover equations, formulas, snippets, and templates.
            </p>
            <ButtonGroup className="mx-auto">
              <ButtonGroup>
                <Button>
                  <Search />
                  Search the Database
                </Button>
              </ButtonGroup>
              <ButtonGroup>
                <Button variant="outline">
                  <Info />
                  Learn More
                </Button>
              </ButtonGroup>
            </ButtonGroup>
          </div>
          <Separator />
          <h2>Scientific Calculator</h2>
          <p></p>
          <Separator />
        </article>
      </main>
      <Footer />
    </>
  );
}

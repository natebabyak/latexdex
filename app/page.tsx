import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Separator } from "@/components/ui/separator";
import { HomeInputGroup } from "./home-input-group";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <article>
          <div className="grid gap-2 text-center">
            <h1 className="line-clamp-2 text-5xl font-semibold text-balance">
              The free and open-source LaTeX database.
            </h1>
            <p className="text-muted-foreground line-clamp-3 text-balance">
              LaTeXdex is a community-driven repository of snippets and
              templates to simplify your LaTeX needs
            </p>
          </div>
          <div className="mx-auto grid gap-2">
            <HomeInputGroup />
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

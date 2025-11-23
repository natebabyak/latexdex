import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NewForm } from "./new-form";

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <div className="max-w-5xl px-4 lg:px-0">
          <NewForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { NewForm } from "./new-form";

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <NewForm />
      </main>
      <Footer />
    </>
  );
}

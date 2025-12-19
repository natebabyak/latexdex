import { Header } from "@/components/layout/header";
import { Content } from "./content";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | LaTeXdex",
};

export default function Page() {
  return (
    <>
      <Header />
      <main className="pt-[68px]">
        <h1 className="text-center text-4xl">Plans that fit your needs</h1>
        <Content />
      </main>
      <Footer />
    </>
  );
}

import "./globals.css";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";

export const metadata: Metadata = {
  title: "LaTeXdex",
  description: "",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      <Script
        id="MathJax-script"
        async
        src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"
      />
    </html>
  );
}

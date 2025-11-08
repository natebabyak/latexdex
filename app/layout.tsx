import "./globals.css";
import { MathJaxContext } from "better-react-mathjax";
import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";

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
          <MathJaxContext>{children}</MathJaxContext>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { NextThemeProvider } from "@/lib/providers/next-theme-provider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion App",
  description: "Notion App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen pt-16")}>
        <NextThemeProvider>
          <Header />
          <div className="container max-w-7xl">{children}</div>
          <Footer />
        </NextThemeProvider>
      </body>
    </html>
  );
}

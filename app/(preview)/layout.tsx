import Navigation from "@/components/navigation/navigation";
import { NextThemeProvider } from "@/lib/providers/next-theme-provider";
import TanstackProvider from "@/lib/providers/tanstack-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";

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
      <body className={cn(inter.className, "min-h-screen")}>
        <NextThemeProvider>
          <TanstackProvider>
            <div className="flex">{children}</div>
          </TanstackProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}

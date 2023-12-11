import Navigation from "@/components/navigation/navigation";
import { NextThemeProvider } from "@/lib/providers/next-theme-provider";
import TanstackProvider from "@/lib/providers/tanstack-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";
import { getAuthSession } from "@/lib/session";
import ContexProvider from "@/lib/providers/context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notion App",
  description: "Notion App",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <body className={cn(inter.className, "min-h-screen")}>
        <NextThemeProvider>
          <TanstackProvider>
            <ContexProvider>
              <Toaster />
              <div className="flex">
                <Navigation user={session?.user} />
                <div className="flex-1">{children}</div>
              </div>
            </ContexProvider>
          </TanstackProvider>
        </NextThemeProvider>
      </body>
    </html>
  );
}

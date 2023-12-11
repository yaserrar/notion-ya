import { cn } from "@/lib/utils";
import Link from "next/link";
import DarkModeButton from "./dark-mode-button";
import { buttonVariants } from "./ui/button";
import { getAuthSession } from "@/lib/session";
import SignoutButton from "./signout-button";
import { Github } from "lucide-react";

const Header = async () => {
  const session = await getAuthSession();

  return (
    <section className="fixed top-0 left-0 w-full border-b">
      <nav className="flex justify-between p-2 container max-w-7xl text-sm items-center opacity-100">
        <Link href="/" className="font-extrabold text-xl text-primary p-2">
          Notion
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="https://github.com/yaserrar/notion-ya"
            className={cn(buttonVariants({ variant: "outline" }), "flex gap-2")}
          >
            <Github size={18} />
            Repo
          </Link>

          {!session?.user ? (
            <Link
              href="/auth"
              className={cn(buttonVariants({ variant: "default" }))}
            >
              Join For Free
            </Link>
          ) : (
            <SignoutButton />
          )}
          <DarkModeButton />
        </div>
      </nav>
    </section>
  );
};

export default Header;

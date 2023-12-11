import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/session";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getAuthSession();

  return (
    <main className="pt-10">
      <h1 className="text-6xl font-bold text-center mx-10">
        Your Ideas, Documents, & Plans. Unified. Welcome to <u>Notion</u>
      </h1>
      <div className="flex justify-center p-6">
        {!session?.user ? (
          <Link
            href="/auth"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Join For Free
          </Link>
        ) : (
          <Link
            href="/documents"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Get Started Now
          </Link>
        )}
      </div>

      <div className="flex justify-center p-10 px-10">
        <Image src="/home.png" alt="notion" width={600} height={400} />
      </div>
    </main>
  );
}

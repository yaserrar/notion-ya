import { getAuthSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import CreateDocument from "./create-document";

export default async function page() {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main className="p-6 flex flex-col items-center gap-10 justify-center">
      <Image src="/main.png" width={600} height={400} alt="notion" />
      <p className="text-4xl font-bold">
        {session.user.name}, Welcome to Notion
      </p>
      <CreateDocument />
    </main>
  );
}

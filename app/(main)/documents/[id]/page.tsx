import { getAuthSession } from "@/lib/session";
import { redirect } from "next/navigation";
import Document from "./document";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const session = await getAuthSession();

  if (!session?.user) {
    redirect("/");
  }

  return <Document id={id} />;
}

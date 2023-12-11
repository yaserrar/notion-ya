import React from "react";
import AuthCard from "./auth-card";
import { getAuthSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await getAuthSession();

  if (session?.user) {
    redirect("/documents");
  }

  return (
    <main className="flex justify-center items-center pt-20">
      <AuthCard />
    </main>
  );
}

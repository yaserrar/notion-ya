import { prisma } from "@/lib/prisma";
import Preview from "./preview";
import { AlertTriangle } from "lucide-react";

export default async function page({
  params: { id },
}: {
  params: { id: string };
}) {
  const document = await prisma.document.findUnique({
    where: {
      id,
      isPublished: true,
    },
  });

  return (
    <div>
      {!!document ? (
        <Preview document={document} />
      ) : (
        <div className="flex flex-col items-center p-6 justify-center">
          <AlertTriangle />
          <p className="font-semibold">Note not found</p>
        </div>
      )}
    </div>
  );
}

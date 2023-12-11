import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/session";

export async function GET() {
  const session = await getAuthSession();

  if (!session?.user) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const documents = await prisma.document.findMany({
      where: { userId: session.user.id },
      // select: {
      //   id: true,
      //   title: true,
      //   icon: true,
      //   isPublished: true,
      //   superDocumentId: true,
      //   isArchived: true,
      // },
    });
    return Response.json(documents, { status: 200 });
  } catch {
    return Response.json({ error: "An error has occurred" }, { status: 500 });
  }
}

export async function POST() {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const document = await prisma.document.create({
      data: {
        title: "Untitled",
        content: "",
        userId: session.user.id,
      },
    });
    return Response.json(document, { status: 200 });
  } catch {
    return Response.json({ error: "An error has occurred" }, { status: 500 });
  }
}

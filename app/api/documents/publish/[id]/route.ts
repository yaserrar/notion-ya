import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/session";

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reqData = await req.json();

    const document = await prisma.document.findUnique({
      where: { id: id, userId: session.user.id },
    });

    if (!document) {
      return Response.json({ error: "Document not found" }, { status: 401 });
    }

    const newDocument = await prisma.document.update({
      where: { id: id },
      data: {
        isPublished: reqData.isPublished,
      },
    });

    return Response.json(newDocument, { status: 200 });
  } catch {
    return Response.json({ error: "An error has occurred" }, { status: 500 });
  }
}

import { archiveSubDocuments } from "@/lib/api-utils";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/session";

export async function POST(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const superDocument = await prisma.document.findUnique({
      where: { id: id, userId: session.user.id },
    });

    if (!superDocument) {
      return Response.json({ error: "Document not found" }, { status: 404 });
    }

    const document = await prisma.document.create({
      data: {
        title: "Untitled",
        content: "",
        userId: session.user.id,
        superDocumentId: superDocument.id,
      },
    });
    return Response.json(document, { status: 200 });
  } catch {
    return Response.json({ error: "An error has occurred" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const superDocument = await prisma.document.findUnique({
      where: { id: id, userId: session.user.id },
    });

    if (!superDocument) {
      return Response.json({ error: "Document not found" }, { status: 404 });
    }

    await prisma.document.update({
      where: { id: id, userId: session.user.id },
      data: {
        isArchived: true,
        superDocumentId: null,
        isPublished: false,
      },
    });

    const documents = await prisma.document.findMany({
      where: { userId: session.user.id },
    });

    documents
      .filter((d) => d.superDocumentId === superDocument.id)
      .forEach((d) => {
        archiveSubDocuments(d, documents, true);
      });

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: "An error has occurred" }, { status: 500 });
  }
}

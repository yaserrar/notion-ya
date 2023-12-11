import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/session";
import { Document } from "@prisma/client";
import { archiveSubDocuments } from "../../[id]/route";

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
        isArchived: false,
      },
    });

    const documents = await prisma.document.findMany({
      where: { userId: session.user.id },
    });

    documents
      .filter((d) => d.superDocumentId === superDocument.id)
      .forEach((d) => {
        archiveSubDocuments(d, documents, false);
      });

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: "An error has occurred" }, { status: 500 });
  }
}

export async function DELETE(
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

    const documents = await prisma.document.findMany({
      where: { userId: session.user.id },
    });

    documents
      .filter((d) => d.superDocumentId === superDocument.id)
      .forEach((d) => {
        deleteSubDocuments(d, documents);
      });

    await prisma.document.delete({
      where: { id: id, userId: session.user.id },
    });

    return Response.json({ success: true }, { status: 200 });
  } catch {
    return Response.json({ error: "An error has occurred" }, { status: 500 });
  }
}

const deleteSubDocuments = async (
  document: Document,
  documents: Document[]
) => {
  documents
    .filter((d) => d.superDocumentId === document.id)
    .forEach((d) => {
      deleteSubDocuments(d, documents);
    });

  await prisma.document.delete({
    where: { id: document.id },
  });
};

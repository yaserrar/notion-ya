import { Document } from "@prisma/client";
import { prisma } from "./prisma";

export const archiveSubDocuments = async (
  document: Document,
  documents: Document[],
  isArchive: boolean
) => {
  await prisma.document.update({
    where: { id: document.id },
    data: {
      isPublished: false,
      isArchived: isArchive,
    },
  });

  documents
    .filter((d) => d.superDocumentId === document.id)
    .forEach((d, i) => {
      archiveSubDocuments(d, documents, true);
    });
};

export const deleteSubDocuments = async (
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

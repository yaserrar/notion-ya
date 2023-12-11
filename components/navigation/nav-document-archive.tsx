import { useDeleteDocument, useRestoreDocument } from "@/hooks/tanstack-hooks";
import { cn } from "@/lib/utils";
import { Document } from "@prisma/client";
import { ChevronRight, File, Trash, Undo } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  document: Document;
  documents: Document[];
};

const NavDocumentArchive = ({ document, documents }: Props) => {
  const [showSubDocs, setShowSubDocs] = useState(false);
  const pathname = usePathname();

  const { mutate: mutateRestore, isPending: isPendingRestore } =
    useRestoreDocument(document.id);

  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteDocument(document.id);

  const subDocuments = documents?.filter(
    (d) => d.superDocumentId === document.id
  );

  return (
    <div>
      <Link
        href={`/documents/${document.id}`}
        key={document.id}
        className={cn(
          "p-2 h-8 w-ful flex justify-between items-center hover:bg-gray-300 duration-200 rounded-lg group",
          pathname === `/documents/${document.id}` && "bg-gray-300/50"
        )}
      >
        <div className="flex gap-1 items-center">
          {subDocuments.length > 0 ? (
            <Button
              size="icon"
              variant="link"
              className="h-4 w-4"
              onClick={(e) => {
                e.preventDefault();
                setShowSubDocs((showSubDocs) => !showSubDocs);
              }}
            >
              <ChevronRight
                size={15}
                className={cn("duration-300", showSubDocs && "rotate-90")}
              />
            </Button>
          ) : (
            <div className="w-4"></div>
          )}
          {document.icon ? (
            <p>{document.icon}</p>
          ) : (
            <File size={15} className="text-gray-400 mx-1" />
          )}
          <p className="text-sm font-medium text-gray-400">{document.title}</p>
        </div>
        <div className="group-hover:flex gap-1 items-center hidden">
          <Button
            disabled={isPendingDelete}
            size="icon"
            variant="link"
            className="h-4 w-4"
            onClick={(e) => {
              e.preventDefault();
              mutateDelete();
            }}
          >
            <Trash size={15} />
          </Button>
          <Button
            disabled={isPendingRestore}
            size="icon"
            variant="link"
            className="h-4 w-4"
            onClick={(e) => {
              e.preventDefault();
              mutateRestore();
            }}
          >
            <Undo size={15} />
          </Button>
        </div>
      </Link>

      {showSubDocs && (
        <div className="ml-4">
          {subDocuments.map((d) => (
            <NavDocumentArchive key={d.id} document={d} documents={documents} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavDocumentArchive;

"use client";

import { useGetDocuments } from "@/hooks/tanstack-hooks";
import { AlertTriangle, Loader2 } from "lucide-react";
import Editor from "./editor";

type Props = {
  id: string;
};

const Document = ({ id }: Props) => {
  const { data: documents, isLoading } = useGetDocuments();
  const document = documents?.find((d) => d.id === id);

  return (
    <div className="w-full">
      {!isLoading ? (
        <>
          {document ? (
            <Editor document={document} />
          ) : (
            <div className="flex flex-col items-center p-6 justify-center">
              <AlertTriangle />
              <p className="font-semibold">Note not found</p>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center p-10">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  );
};

export default Document;

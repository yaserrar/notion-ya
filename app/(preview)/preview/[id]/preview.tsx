"use client";

import { Input } from "@/components/ui/input";
import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Document } from "@prisma/client";
import { useTheme } from "next-themes";

import "@blocknote/core/style.css";

type Props = {
  document: Document;
};

const Preview = ({ document }: Props) => {
  const { resolvedTheme } = useTheme();

  const initialContent = () => {
    try {
      return JSON.parse(document.content);
    } catch {
      return undefined;
    }
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable: false,
    initialContent: initialContent(),
  });

  return (
    <div className="p-1 md:p-10">
      <div className="py-4 pl-12">
        <p className="text-5xl cursor-pointer mb-4">{document.icon}</p>
        <Input
          disabled
          className="text-5xl font-bold p-0 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
          defaultValue={document.title}
        />
      </div>
      <BlockNoteView
        editor={editor}
        theme={resolvedTheme === "dark" ? "dark" : "light"}
      />
    </div>
  );
};

export default Preview;

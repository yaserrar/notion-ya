"use client";

import { Input } from "@/components/ui/input";
import {
  useEditDocumentContent,
  useEditDocumentEmoji,
  useEditDocumentTitle,
} from "@/hooks/tanstack-hooks";
import { BlockNoteEditor } from "@blocknote/core";
import "@blocknote/core/style.css";
import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Document } from "@prisma/client";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import EditorHeader from "./editor-header";
import EmojiPicker from "./emoji-picker";
import { NavigationContext } from "@/lib/providers/context-provider";
import { cn } from "@/lib/utils";
import useWindowDimensions from "@/hooks/use-window-dimensions";

type Props = {
  document: Document;
};

const Editor = ({ document }: Props) => {
  const { resolvedTheme } = useTheme();
  const { showNavigation } = useContext(NavigationContext);
  const { width } = useWindowDimensions();
  const [firstRender, setFirstRender] = useState(true);

  const [content, setContent] = useState("");
  const [contentDebounced] = useDebounce(content, 1000);

  const [title, setTitle] = useState(document.title);
  const [titleDebounced] = useDebounce(title, 1000);

  const {
    mutate: mutateContent,
    isPending: isPendingContent,
    isSuccess: isSuccessContent,
  } = useEditDocumentTitle(document.id);

  const {
    mutate: mutateTitle,
    isPending: isPendingTitle,
    isSuccess: isSuccessTitle,
  } = useEditDocumentContent(document.id);

  const {
    mutate: mutateEmoji,
    isPending: isPendingEmoji,
    isSuccess: isSuccessEmoji,
  } = useEditDocumentEmoji(document.id);

  const initialContent = () => {
    try {
      return JSON.parse(document.content);
    } catch {
      return undefined;
    }
  };

  const editor: BlockNoteEditor = useBlockNote({
    editable: !document.isArchived,
    initialContent: initialContent(),
    onEditorContentChange: (editor) => {
      setContent(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
  });

  useEffect(() => {
    if (!firstRender && !document.isArchived) {
      mutateContent({ content: contentDebounced });
    }
    if (firstRender) {
      setFirstRender(false);
    }
  }, [contentDebounced]);

  useEffect(() => {
    if (!firstRender && !document.isArchived) {
      mutateTitle({ title: titleDebounced });
    }
    if (firstRender) {
      setFirstRender(false);
    }
  }, [titleDebounced]);

  return (
    <div
      className={cn(
        "w-full max-h-[99vh] overflow-y-auto overflow-x-hidden",
        showNavigation && width && width < 768 && "w-0"
      )}
    >
      <EditorHeader document={document} setTitle={setTitle} title={title} />
      <div className="h-10 p-6 flex justify-between">
        <div>
          {isPendingContent || isPendingTitle || isPendingEmoji ? (
            <p className="text-sm flex gap-1 items-center font-semibold text-gray-400">
              <Loader2 size={15} className="animate-spin" />
              Saving
            </p>
          ) : (
            (isSuccessContent || isSuccessTitle || isSuccessEmoji) && (
              <p className="text-sm flex gap-1 items-center font-semibold text-gray-400">
                <Check size={15} /> Saved
              </p>
            )
          )}
        </div>
        {document.isArchived && (
          <p className="text-md font-semibold text-red-500 flex items-center gap-1">
            <AlertTriangle size={16} /> Archived
          </p>
        )}
      </div>
      <div className="p-1 md:p-10">
        <div className="py-4 pl-12">
          <EmojiPicker document={document} mutate={mutateEmoji} />
          <Input
            disabled={document.isArchived}
            className="text-5xl font-bold p-0 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <BlockNoteView
          editor={editor}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
        />
      </div>
    </div>
  );
};

export default Editor;

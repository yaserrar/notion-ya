import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  useArchiveDocument,
  useDeleteDocument,
  useEditDocumentEmojiPublished,
  useRestoreDocument,
} from "@/hooks/tanstack-hooks";
import { Document } from "@prisma/client";
import { Check, Copy, Share2, Trash, Undo } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  document: Document;
  setTitle: Dispatch<SetStateAction<string>>;
  title: string;
};

const EditorHeader = ({ document, setTitle, title }: Props) => {
  const [copied, setCopied] = useState(false);
  const { mutate: mutatePublish } = useEditDocumentEmojiPublished(document.id);
  const { mutate: mutateArchive, isPending: isPendingArchive } =
    useArchiveDocument(document.id);
  const { mutate: mutateRestore, isPending: isPendingRestore } =
    useRestoreDocument(document.id);
  const { mutate: mutateDelete, isPending: isPendingDelete } =
    useDeleteDocument(document.id);

  const onCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST}/preview/${document.id}`
    );
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <section className="w-full border-b z-50 bg-white">
      <nav className="flex justify-between p-2 pl-6">
        <div className="flex items-center gap-1">
          <p>{document.icon}</p>
          <Input
            disabled={document.isArchived}
            className="text-lg font-medium p-0 border-none outline-none focus-visible:ring-0 focus-visible:ring-transparent"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="flex  gap-2">
          <Popover>
            <PopoverTrigger asChild disabled={document.isArchived}>
              <Button className="flex gap-1 items-center" variant="secondary">
                Publish {document.isPublished && <Check size={16} />}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end">
              <div className="flex flex-col gap-2 items-center">
                <Share2 />
                {!document.isPublished ? (
                  <>
                    <p className="text-sm font-semibold">Publish this note</p>
                    <p className="text-xs">Share your work with others.</p>
                  </>
                ) : (
                  <div className="flex items-center">
                    <Input
                      defaultValue={`${process.env.NEXT_PUBLIC_HOST}/preview/${document.id}`}
                      readOnly
                      className=" outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                    />
                    <Button
                      size="icon"
                      className="flex-1 p-2"
                      disabled={copied}
                      onClick={onCopy}
                    >
                      {!copied ? <Copy size={15} /> : <Check size={15} />}
                    </Button>
                  </div>
                )}
                <Button
                  className="w-full"
                  size="sm"
                  onClick={() =>
                    mutatePublish({ isPublished: !document.isPublished })
                  }
                >
                  {!document.isPublished ? "Publish" : "Unpublish"}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            size="icon"
            variant="secondary"
            onClick={() =>
              !document.isArchived ? mutateArchive() : mutateDelete()
            }
            disabled={isPendingArchive || isPendingDelete}
          >
            <Trash size={15} />
          </Button>
          {document.isArchived && (
            <Button
              size="icon"
              variant="secondary"
              onClick={() => mutateRestore()}
              disabled={isPendingRestore}
            >
              <Undo size={15} />
            </Button>
          )}
        </div>
      </nav>
    </section>
  );
};

export default EditorHeader;

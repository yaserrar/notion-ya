import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Document } from "@prisma/client";
import { UseMutateFunction } from "@tanstack/react-query";
import EmojiPickerReact from "emoji-picker-react";
import { Smile, X } from "lucide-react";
import { useState } from "react";

type Props = {
  document: Document;
  mutate: UseMutateFunction<Document, Error, { icon: string | null }, unknown>;
};

const EmojiPicker = ({ document, mutate }: Props) => {
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div className="group flex items-center">
      <Popover open={showPopover} onOpenChange={setShowPopover}>
        <PopoverTrigger
          asChild={!document.icon}
          className="mb-4"
          disabled={document.isArchived}
        >
          {document.icon ? (
            <p
              className={cn(
                "text-5xl",
                !document.isArchived && "cursor-pointer"
              )}
            >
              {document.icon}
            </p>
          ) : (
            <Button variant="outline" className="flex gap-1 items-center">
              <Smile size={15} /> Add Icon
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent className="w-fit">
          <EmojiPickerReact
            onEmojiClick={(emojiData) => {
              mutate({ icon: emojiData.emoji });
              setShowPopover(false);
            }}
          />
        </PopoverContent>
      </Popover>
      {document.icon && (
        <Button
          variant="outline"
          size="icon"
          className="rounded-full group-hover:flex hidden"
          onClick={() => mutate({ icon: null })}
        >
          <X size={18} />
        </Button>
      )}
    </div>
  );
};

export default EmojiPicker;

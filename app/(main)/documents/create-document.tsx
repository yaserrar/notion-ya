"use client";

import { Button } from "@/components/ui/button";
import { useNewDocument } from "@/hooks/tanstack-hooks";
import { Plus } from "lucide-react";

const CreateDocument = () => {
  const { mutate, isPending } = useNewDocument();

  return (
    <Button
      className="flex items-center gap-2"
      onClick={() => mutate()}
      disabled={isPending}
    >
      <Plus size={18} /> Create a note
    </Button>
  );
};

export default CreateDocument;

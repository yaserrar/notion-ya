"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useGetDocuments, useNewDocument } from "@/hooks/tanstack-hooks";
import useWindowDimensions from "@/hooks/use-window-dimensions";
import { NavigationContext } from "@/lib/providers/context-provider";
import { cn } from "@/lib/utils";
import { SessionUser } from "@/types/next-auth";
import {
  ChevronRight,
  Loader2,
  LogOut,
  PlusCircle,
  Trash,
  X,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Resizable } from "re-resizable";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import NavDocument from "./nav-document";
import NavDocumentArchive from "./nav-document-archive";

type Props = {
  user: SessionUser | undefined;
};

const Navigation = ({ user }: Props) => {
  const [showArchivedDocs, setShowArchivedDocs] = useState(false);
  const { data: documents, isLoading } = useGetDocuments();
  const { mutate: mutateAdd, isPending: isPendingAdd } = useNewDocument();
  const { width } = useWindowDimensions();
  const { showNavigation, toggleShowNavigation } =
    useContext(NavigationContext);

  return (
    <Resizable
      defaultSize={{
        width: width && width > 768 ? 400 : 0,
        height: "95vh",
      }}
      maxWidth={showNavigation && width && width > 768 ? "100%" : 500}
      minWidth={width && width > 768 ? 300 : 0}
    >
      <aside
        className={cn(
          "bg-gray-200 dark:bg-black w-0 md:w-full overflow-x-auto h-screen",
          showNavigation && width && width < 768 && "w-screen"
        )}
      >
        <div className="m-4 flex-col flex">
          <div className="my-4 flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="secondary"
                  className="flex rounded-lg items-center gap-2 py-6 w-full"
                >
                  <Image
                    alt="user"
                    src={user?.image ?? ""}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <p className="text-xs font-semibold text-gray-600">
                    {user?.email}
                  </p>
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <Button
                  className="w-full gap-2 flex items-center"
                  onClick={() => signOut()}
                >
                  <LogOut size={15} /> Sign out
                </Button>
              </PopoverContent>
            </Popover>

            <Button
              variant="secondary"
              size="icon"
              className="md:hidden"
              onClick={() => toggleShowNavigation()}
            >
              <X size={18} />
            </Button>
          </div>

          <Button
            size="sm"
            className="flex text-sm gap-2 mb-4"
            variant="secondary"
            onClick={() => {
              mutateAdd();
            }}
            disabled={isPendingAdd}
          >
            <PlusCircle size={18} /> Add new Page
          </Button>

          {!isLoading ? (
            <>
              {documents && documents.length > 0 ? (
                <>
                  <div>
                    {documents
                      .filter(
                        (document) =>
                          document.superDocumentId === null &&
                          !document.isArchived
                      )
                      .map((document) => (
                        <NavDocument
                          key={document.id}
                          document={document}
                          documents={documents}
                        />
                      ))}
                  </div>
                  <div className="mt-4">
                    <Button
                      className="flex gap-2 items-center justify-between w-full"
                      variant="secondary"
                      onClick={() =>
                        setShowArchivedDocs(
                          (showArchivedDocs) => !showArchivedDocs
                        )
                      }
                    >
                      <p className="flex gap-1 items-center">
                        <Trash size={15} /> Trash
                      </p>
                      <ChevronRight
                        size={15}
                        className={cn(
                          "duration-200",
                          showArchivedDocs && "rotate-90"
                        )}
                      />
                    </Button>

                    {showArchivedDocs &&
                      documents
                        .filter(
                          (document) =>
                            document.superDocumentId === null &&
                            document.isArchived
                        )
                        .map((document) => (
                          <NavDocumentArchive
                            key={document.id}
                            document={document}
                            documents={documents}
                          />
                        ))}
                  </div>
                </>
              ) : (
                <p className="text-sm w-full text-center">No note found</p>
              )}
            </>
          ) : (
            <div className="flex justify-center">
              <Loader2 className="animate-spin" />
            </div>
          )}
        </div>
      </aside>
    </Resizable>
  );
};

export default Navigation;

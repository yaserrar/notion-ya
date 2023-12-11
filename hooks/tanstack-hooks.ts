import { Document } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export const useGetDocuments = () => {
  return useQuery({
    queryKey: ["Documents"],
    queryFn: () =>
      axios.get("/api/documents").then((res) => res.data as Document[]),
  });
};

export const useNewDocument = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => {
      return axios.post("/api/documents").then((res) => res.data);
    },
    onSuccess: async (data: Document) => {
      toast.success("Note created succesfully");
      queryClient.setQueryData(["Documents"], (oldData: Document[]) => {
        return [...oldData, data];
      });
      router.push(`/documents/${data.id}`);
    },
  });
};

export const useAddDocument = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.post(`/api/documents/${id}`).then((res) => res.data);
    },
    onSuccess: async (data: Document) => {
      toast.success("Note created succesfully");
      queryClient.setQueryData(["Documents"], (oldData: Document[]) => {
        return [...oldData, data];
      });
    },
  });
};

export const useArchiveDocument = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.put(`/api/documents/${id}`).then((res) => res.data);
    },
    onSuccess: async () => {
      toast.success("Note Archived succesfully");
      queryClient.invalidateQueries({ queryKey: ["Documents"] });
    },
  });
};

export const useRestoreDocument = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      return axios.put(`/api/documents/archive/${id}`).then((res) => res.data);
    },
    onSuccess: async (data: Document) => {
      toast.success("Note restored succesfully");
      queryClient.invalidateQueries({ queryKey: ["Documents"] });
    },
  });
};

export const useDeleteDocument = (id: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const pathname = usePathname();

  return useMutation({
    mutationFn: () => {
      return axios
        .delete(`/api/documents/archive/${id}`)
        .then((res) => res.data);
    },
    onSuccess: async () => {
      toast.success("Note deleted succesfully");
      queryClient.invalidateQueries({ queryKey: ["Documents"] });
      if (pathname === `/documents/${id}`) {
        router.replace("/documents");
      }
    },
  });
};

export const useEditDocumentTitle = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { content: string }) => {
      return axios
        .put(`/api/documents/content/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: async (newDocument: Document) => {
      queryClient.setQueryData(["Documents"], (oldData: Document[]) => {
        return oldData.map((document) =>
          document.id !== newDocument.id
            ? document
            : { ...document, content: newDocument.content }
        );
      });

      queryClient.setQueryData(["Documents", id], (oldData: Document) => {
        return { ...oldData, content: newDocument.content };
      });
    },
  });
};

export const useEditDocumentContent = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { title: string }) => {
      return axios
        .put(`/api/documents/title/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: async (newDocument: Document) => {
      queryClient.setQueryData(["Documents"], (oldData: Document[]) => {
        return oldData.map((document) =>
          document.id !== newDocument.id
            ? document
            : { ...document, title: newDocument.title }
        );
      });

      queryClient.setQueryData(["Documents", id], (oldData: Document) => {
        return { ...oldData, title: newDocument.title };
      });
    },
  });
};

export const useEditDocumentEmoji = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { icon: string | null }) => {
      return axios
        .put(`/api/documents/icon/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: async (newDocument: Document) => {
      queryClient.setQueryData(["Documents"], (oldData: Document[]) => {
        return oldData.map((document) =>
          document.id !== newDocument.id
            ? document
            : { ...document, icon: newDocument.icon }
        );
      });

      queryClient.setQueryData(["Documents", id], (oldData: Document) => {
        return { ...oldData, icon: newDocument.icon };
      });
    },
  });
};

export const useEditDocumentEmojiPublished = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { isPublished: boolean }) => {
      return axios
        .put(`/api/documents/publish/${id}`, data)
        .then((res) => res.data);
    },
    onSuccess: async (newDocument: Document) => {
      queryClient.setQueryData(["Documents"], (oldData: Document[]) => {
        return oldData.map((document) =>
          document.id !== newDocument.id
            ? document
            : { ...document, isPublished: newDocument.isPublished }
        );
      });

      queryClient.setQueryData(["Documents", id], (oldData: Document) => {
        return { ...oldData, isPublished: newDocument.isPublished };
      });
    },
  });
};

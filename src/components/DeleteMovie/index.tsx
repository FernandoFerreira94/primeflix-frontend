"use client";
import { MdDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { deleteMovie } from "@/actions/deleteMovie";

interface DeleteProps {
  movieId: string;
}

export default function DeleteMovie({ movieId }: DeleteProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(() => {
      deleteMovie(movieId)
        .then(() => {
          toast.success("Filme removido!");
          router.refresh();
        })
        .catch(() => {
          toast.error("Erro ao remover");
        });
    });
  };

  return (
    <button className="cursor-pointer" onClick={handleDelete}>
      <MdDeleteOutline
        size={40}
        color="red"
        className="border-2 rounded-md p-0.5 border-transparent
        transition duration-500 hover:border-red-600"
      />
    </button>
  );
}

"use client";

import React, { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { moviesRoute } from "@/src/app/components/service/movie";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface DeleteMovieButtonProps {
  id: string;
  movieTitle: string;
}

export default function DeleteMovieButton({ id, movieTitle }: DeleteMovieButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete "${movieTitle}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#E50914",
      cancelButtonColor: "#2B2B2B",
      confirmButtonText: "Yes, delete it!",
      background: "#141414",
      color: "#141414"
    });

    if (!result.isConfirmed) return;

    setIsDeleting(true);
    const toastId = toast.loading(`Deleting "${movieTitle}"...`);

    try {
      await moviesRoute.deleteMovies(id);
      toast.success(`"${movieTitle}" deleted successfully`, { id: toastId });
      router.refresh();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.message || `Failed to delete "${movieTitle}"`, { id: toastId });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-gray-400 hover:text-[#E50914] hover:bg-[#2B2B2B] rounded-sm transition-colors disabled:opacity-50"
      title="Delete Movie"
    >
      {isDeleting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Trash2 className="w-4 h-4" />
      )}
    </button>
  );
}

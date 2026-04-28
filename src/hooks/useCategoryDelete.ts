"use client";

import { useState } from "react";
import { toast } from "sonner";

import { deleteCategory } from "@/data/categoriesActions";

export function useCategoryDelete(categorySlug: string) {
  const [isDeleting, setIsDeleting] = useState(false);

  const runDelete = async () => {
    if (isDeleting) {
      return false;
    }

    setIsDeleting(true);

    try {
      const result = await deleteCategory(categorySlug);

      if (!result.success) {
        throw new Error(result.error);
      }

      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";

      console.error(message);
      toast.error(message);
      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return { runDelete, isDeleting };
}

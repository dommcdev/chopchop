"use client";

import { useState } from "react";
import { toast } from "sonner";

import { deleteRecipe } from "@/data/recipesActions";

export function useRecipeDelete(recipeSlug: string) {
  const [isDeleting, setIsDeleting] = useState(false);

  const runDelete = async () => {
    if (isDeleting) {
      return false;
    }

    setIsDeleting(true);

    try {
      const result = await deleteRecipe(recipeSlug);

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

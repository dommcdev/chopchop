"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { RecipeEditor, RecipeEditorSkeleton } from "@/components/RecipeEditor";
import { createRecipe } from "@/data/recipesActions";
import { FinalRecipeSchema } from "@/lib/finalRecipeSchema";
import { EMPTY_RECIPE_EDITOR_VALUES } from "@/lib/hookformSchema";
import { useRecipeUploadStore } from "@/store/useRecipeUploadStore";
import { CategoryBrief } from "@/types";

interface NewRecipeClientProps {
  categoriesPromise: Promise<CategoryBrief[]>;
}

//TODO could we refactor this and EditRecipeClient into one component?
export function NewRecipeClient({ categoriesPromise }: NewRecipeClientProps) {
  const router = useRouter();
  const draft = useRecipeUploadStore((state) => state.draft);
  const isAnalyzing = useRecipeUploadStore((state) => state.isAnalyzing);
  const clearStore = useRecipeUploadStore((state) => state.clearStore);
  const categories = use(categoriesPromise);

  const handleSave = async (finalData: FinalRecipeSchema) => {
    try {
      const result = await createRecipe(finalData);

      if (!result.success) {
        throw new Error(result.error);
      }

      clearStore();
      toast.success("Recipe created.");
      router.push(`/dashboard/r/${result.slug}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(message);
      toast.error(message);
    }
  };

  const handleCancel = () => {
    clearStore();
    router.back();
  };

  if (isAnalyzing) return <RecipeEditorSkeleton />;

  const initialValues = draft ?? EMPTY_RECIPE_EDITOR_VALUES;

  return (
    <RecipeEditor
      initialValues={initialValues}
      categories={categories}
      handleSave={handleSave}
      handleCancel={handleCancel}
    />
  );
}

"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { RecipeEditor } from "@/components/RecipeEditor";
import { createRecipe } from "@/data/recipesActions";
import { FinalRecipeSchema } from "@/lib/finalRecipeSchema";
import { EMPTY_RECIPE_EDITOR_VALUES } from "@/lib/hookformSchema";
import { useRecipeUploadStore } from "@/store/useRecipeUploadStore";
import { CategoryBrief } from "@/types";

interface NewRecipeClientProps {
  categoriesPromise: Promise<CategoryBrief[]>;
}

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
        toast.error(result.error);
        return;
      }

      clearStore();
      toast.success("Recipe created.");
      router.push(`/dashboard/recipes/${result.slug}`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to create recipe.");
    }
  };

  if (isAnalyzing) return <p>Analyzing Recipe, please wait...</p>;

  const initialValues = draft ?? EMPTY_RECIPE_EDITOR_VALUES;

  return (
    <RecipeEditor
      initialValues={initialValues}
      categories={categories}
      handleSave={handleSave}
    />
  );
}

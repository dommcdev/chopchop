"use client";

import { use } from "react";
import { RecipeEditor } from "@/components/RecipeEditor";
import { updateRecipe } from "@/data/recipesActions";
import { recipeBlobToRecipeEditorInitialValues } from "@/lib/recipeEditorMappers";
import { useRouter } from "next/navigation";
import { FinalRecipeSchema } from "@/lib/finalRecipeSchema";
import { CategoryBrief, RecipeBlob } from "@/types";
import { toast } from "sonner";

interface EditRecipeClientProps {
  recipePromise: Promise<RecipeBlob | undefined>;
  categoriesPromise: Promise<CategoryBrief[]>;
}

export function EditRecipeClient({
  recipePromise,
  categoriesPromise,
}: EditRecipeClientProps) {
  const router = useRouter();
  const initialData = use(recipePromise);
  const categories = use(categoriesPromise);

  if (!initialData) {
    return <p>Oops! That recipe does not seem to exist.</p>; //TODO render our error/404 screen here
  }

  const initialValues = recipeBlobToRecipeEditorInitialValues(initialData);

  const handleSave = async (finalData: FinalRecipeSchema) => {
    try {
      const result = await updateRecipe(initialData.slug, finalData);

      if (!result.success) {
        throw new Error(result.error);
      }

      toast.success("Recipe updated.");
      router.push(`/dashboard/r/${result.slug}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(message);
      console.error(message);
      toast.error(message);
    }
  };

  return (
    <RecipeEditor
      initialValues={initialValues}
      categories={categories}
      handleSave={handleSave}
    />
  );
}

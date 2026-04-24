"use client";

import { use } from "react";
import { RecipeEditor } from "@/components/RecipeEditor";
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
      // update db
      toast("You submitted the following values (from parent):", {
        description: <code>{JSON.stringify(finalData, null, 2)}</code>,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
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

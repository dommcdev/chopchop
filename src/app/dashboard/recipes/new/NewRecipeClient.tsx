"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { RecipeEditor } from "@/components/RecipeEditor";
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
    toast("You submitted the following values (from parent):", {
      description: <code>{JSON.stringify(finalData, null, 2)}</code>,
    });
    // save data to db here (in a try/catch)
    clearStore();
    router.push("/dashboard"); // change this to navigate to actual recipe page
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

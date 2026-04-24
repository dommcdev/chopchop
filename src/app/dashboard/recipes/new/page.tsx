"use client";

import { RecipeEditor } from "@/components/RecipeEditor";
import { useRecipeUploadStore } from "@/store/useRecipeUploadStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { EditorOutSchema } from "@/lib/editor-out-schema";

export default function NewRecipePage() {
  const router = useRouter();
  const analyzedData = useRecipeUploadStore((state) => state.analyzedData);
  const isAnalyzing = useRecipeUploadStore((state) => state.isAnalyzing);
  const clearStore = useRecipeUploadStore((state) => state.clearStore);

  const handleSave = async (finalData: EditorOutSchema) => {
    toast("You submitted the following values (from parent):", {
      description: <code>{JSON.stringify(finalData, null, 2)}</code>,
    });
    //save data to db here (in a try/catch)
    clearStore();
    router.push("/dashboard"); //change this to navigate to actual recipe page
  };

  if (isAnalyzing) return <p> Analyzing Recipe, please wait...</p>;

  // Use data from zustand store if present, otherwise use empty object (for manual recipe entry)
  const initialData = analyzedData || {};
  return <RecipeEditor recipeData={initialData} handleSave={handleSave} />;
}

"use client";

import { RecipeEditor } from "@/components/RecipeEditor";
import { useRecipeUploadStore } from "@/store/useRecipeUploadStore";

export default function NewRecipePage() {
  const analyzedData = useRecipeUploadStore((state) => state.analyzedData);
  const isAnalyzing = useRecipeUploadStore((state) => state.isAnalyzing);

  if (isAnalyzing) return <p> Analyzing Recipe, please wait...</p>;
  if (!analyzedData) return <RecipeEditor />;
  return <RecipeEditor recipeData={analyzedData} />;
}

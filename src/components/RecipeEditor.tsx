"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema, type RecipeSchema } from "@/lib/recipe-schema";

export function RecipeEditor({
  initialData,
}: {
  initialData?: Partial<RecipeSchema>;
}) {
  // 1. Initialize the form
  const form = useForm<RecipeSchema>({
    resolver: zodResolver(recipeSchema),
    mode: "onBlur", // Optional: validates when a user leaves a field
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      servings: initialData?.servings || 1,
      prepTime: initialData?.prepTime || 0,
      cookTime: initialData?.cookTime || 0,
      ingredients: initialData?.ingredients || [],
      instructions: initialData?.instructions || [],
    },
  });

  // 2. Define the submit handler
  const onSubmit = (data: RecipeSchema) => {
    console.log("Form Data:", data);
    // This is where your Server Action (e.g., saveRecipe) will go eventually
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* We will build the fields here next! */}
    </form>
  );
}

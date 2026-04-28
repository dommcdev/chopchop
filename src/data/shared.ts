/*
 * This file is for general functions that involve database reads etc.
 */

import "server-only";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { hookformSchema } from "@/lib/hookformSchema";
import { RecipesExportData } from "@/types";
import { eq } from "drizzle-orm";
import { cache } from "react";

export const checkAuth = cache(async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
});

export async function fetchRecipesExportData(): Promise<RecipesExportData> {
  const userId = await checkAuth();

  const allRecipes = await db.query.recipes.findMany({
    where: eq(recipes.userId, userId),
    orderBy: (recipe, { desc }) => [desc(recipe.createdAt)],
    with: {
      category: {
        columns: {
          name: true,
        },
      },
      ingredients: {
        orderBy: (ingredient, { asc }) => [asc(ingredient.id)],
      },
      instructions: {
        orderBy: (instruction, { asc }) => [asc(instruction.displayOrder)],
      },
    },
  });

  return allRecipes.map((recipe) => {
    const formSafeRecipe = hookformSchema.parse({
      name: recipe.name,
      description: recipe.description,
      servings: recipe.servings,
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      categoryId: recipe.categoryId,
      imageUrl: recipe.imageUrl,
      imageKey: recipe.imageKey,
      ingredients: recipe.ingredients.map((ingredient) => ({
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
      })),
      instructions: recipe.instructions.map((instruction) => ({
        text: instruction.text,
      })),
    });

    return {
      name: formSafeRecipe.name,
      description: formSafeRecipe.description,
      servings: formSafeRecipe.servings,
      prepTime: formSafeRecipe.prepTime,
      cookTime: formSafeRecipe.cookTime,
      category: recipe.category?.name ?? "",
      ingredients: formSafeRecipe.ingredients,
      instructions: formSafeRecipe.instructions,
    };
  });
}

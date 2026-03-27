"use server";

import { db } from "@/db";
import { recipes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export type RecipeWithDetails = {
  id: number;
  name: string;
  description: string | null;
  servings: number;
  prepTime: number | null;
  cookTime: number | null;
  categoryId: number | null;
  categoryName: string | null;
  ingredients: Array<{
    id: number;
    name: string;
    quantity: number | null;
    unit: string | null;
  }>;
  createdAt: string;
  updatedAt: string;
};

export async function fetchRecipes(): Promise<RecipeWithDetails[]> {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const results = await db.query.recipes.findMany({
    where: eq(recipes.userId, userId),
    with: {
      category: true,
      ingredients: true,
    },
  });

  return results.map((recipe) => {
    const ingredientNames = recipe.ingredients.map((i) => i.name).join(" ");

    const searchValue = [
      recipe.name,
      recipe.category?.name,
      recipe.description,
      ...recipe.ingredients.map((i) => i.name),
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return {
      ...recipe,
      categoryName: recipe.category?.name ?? null,
      searchValue,
    };
  });
}

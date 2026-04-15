/*
 * This file is for all recipe-related functions that involve database reads
 */

import "server-only";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { and, or, eq } from "drizzle-orm";
import { RecipeWithDetails } from "@/types";
import { checkAuth } from "./shared";
import { cache } from "react";

// Fetch block of recipes for homepage infinite scroll
export async function fetchRecipesBlock(limit: number, offset: number) {
  const userId = await checkAuth();

  return await db.query.recipes.findMany({
    where: eq(recipes.userId, userId),
    orderBy: (r, { desc: descCol }) => [descCol(r.createdAt)],
    limit,
    offset,
    with: {
      category: true,
    },
  });
}

// Fetch all recipes for a user, for use in search
export async function fetchSearchData(): Promise<RecipeWithDetails[]> {
  const userId = await checkAuth();

  const results = await db.query.recipes.findMany({
    where: eq(recipes.userId, userId),
    with: {
      category: true,
      ingredients: true,
    },
  });

  return results.map((recipe) => ({
    ...recipe,
    categoryName: recipe.category?.name ?? null,
  }));
}

export const fetchAllRecipeData = cache(async (slug: string) => {
  const userId = await checkAuth();

  return await db.query.recipes.findFirst({
    where: and(
      eq(recipes.userId, userId),
      or(eq(recipes.slug, slug), eq(recipes.publicId, slug)),
    ),
    with: {
      category: true,
      ingredients: {
        orderBy: (ingredients, { asc }) => [asc(ingredients.id)],
      },
      instructions: {
        orderBy: (instructions, { asc }) => [asc(instructions.stepNumber)],
      },
    },
  });
});

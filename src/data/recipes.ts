//import "server-only";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { Recipe, RecipeWithDetails } from "@/types";

async function checkAuth() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

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

// Calculate total cook time from prepTime + cookTime
export function totalCookMinutes(
  recipe: Pick<Recipe, "prepTime" | "cookTime">,
) {
  return (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);
}

/*
 * Calculates how much to multiply ingredients by.
 * Defaults to 1 if servings are missing or invalid.
 */
export function calculateScaleFactor(
  target: number,
  base: number | null | undefined,
): number {
  if (!base || base <= 0) return 1;
  return target / base;
}

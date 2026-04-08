//import "server-only";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { RecipeWithDetails } from "@/types/recipes";

async function checkAuth() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return userId;
}

// Fetch block of recipes for homepage infinite scroll
export async function fetchRecipesBlock(limit: number = 6, offset: number = 0) {
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

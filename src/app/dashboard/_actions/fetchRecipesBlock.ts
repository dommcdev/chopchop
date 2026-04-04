"use server";

import { getRecipes } from "@/data/recipes";

export async function fetchRecipesBlock(page: number) {
  const limit = 12; // Match the DAL default
  const offset = page * limit;

  const data = await getRecipes(limit, offset);

  if (data.length === 0) return null;

  return data; // Return raw JSON objects
}

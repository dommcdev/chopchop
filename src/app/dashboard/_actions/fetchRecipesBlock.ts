// This file allows the BrowseRecipes component to fetch more recipes as necessary.

"use server";

import { fetchRecipesBlock as fetchRecipesFromDAL } from "@/data/recipes";

export async function fetchRecipesBlock(limit: number, page: number) {
  const offset = page * limit;

  const data = await fetchRecipesFromDAL(limit, offset);

  if (data.length === 0) return null;

  return data; // Return raw JSON objects
}

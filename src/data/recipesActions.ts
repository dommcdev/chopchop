/*
 * This file is for all recipe-related functions that involve database mutations
 * OR functions that wrap other recipe-related functions for use in client components
 */

"use server";

import { fetchRecipesBlock as fetchRecipesFromDAL } from "@/data/recipes";

// Allow the BrowseRecipes client component to fetch more recipes as necessary.
export async function fetchRecipesBlock(limit: number, offset: number) {
  const data = await fetchRecipesFromDAL(limit, offset);

  if (data.length === 0) return null;

  return data; // Return raw JSON objects
}

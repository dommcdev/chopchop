/*
 * This file is for all recipe-related functions that *don't* involve auth/a user id. */

import { Recipe } from "@/types";

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

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Recipe, Ingredient, PrintableScaledIngredient } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
 * Converts a string into a URL-friendly slug.
 * Example: "Chicken & Waffles" -> "chicken-waffles"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

/*
 * Formats numbers cleanly for display
 */
export function formatNumber(value: number) {
  if (Number.isInteger(value)) return value.toString();
  return value
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
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

/**
 * Transforms a list of raw ingredients into a scaled version
 * ready for the printable card.
 */
export function getScaledIngredients(
  ingredients: Ingredient[],
  scaleFactor: number,
): PrintableScaledIngredient[] {
  return ingredients.map((ingredient) => ({
    id: ingredient.id,
    name: ingredient.name,
    unit: ingredient.unit,
    scaledAmount:
      ingredient.quantity === null ? null : ingredient.quantity * scaleFactor,
  }));
}

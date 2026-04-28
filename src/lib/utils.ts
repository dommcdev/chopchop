import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Recipe } from "@/types";
import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const generateAlphanumericPublicId = customAlphabet(
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  11,
);

export function generatePublicId(): string {
  return generateAlphanumericPublicId();
}

/*
 * Converts a string into a URL-friendly slug.
 * Example: "Chicken & Waffles" -> "chicken-waffles"
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-"); // Replace multiple - with single -
}

// Calculate total cook time from prepTime + cookTime
export function totalCookMinutes(
  recipe: Pick<Recipe, "prepTime" | "cookTime">,
) {
  return (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);
}

// Convert minutes to hr + min
export function formatMinutes(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) return `${remainingMinutes} min`;
  if (remainingMinutes === 0) return `${hours} hr`;
  return `${hours} hr ${remainingMinutes} min`;
}

/*
 * Calculates how much to multiply ingredients by.
 * Defaults to 1 if servings are missing.
 */
export function calculateScaleFactor(
  target: number,
  base: number | null | undefined,
): number {
  if (base == null) return 1;
  return target / base;
}

export function getScaledAmount(
  amount: number | null | undefined,
  scaleFactor: number,
): number | null {
  if (amount == null) return null;
  return Math.round(amount * scaleFactor * 10) / 10;
}

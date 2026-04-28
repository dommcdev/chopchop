import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Recipe } from "@/types";

const PUBLIC_ID_ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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

export function generatePublicId(size = 10): string {
  const randomBytes = crypto.getRandomValues(new Uint8Array(size));

  return Array.from(
    randomBytes,
    (byte) => PUBLIC_ID_ALPHABET[byte % PUBLIC_ID_ALPHABET.length],
  ).join("");
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

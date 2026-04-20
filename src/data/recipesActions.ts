/*
 * This file is for all recipe-related functions that involve database mutations
 * OR functions that wrap other recipe-related functions for use in client components
 */

"use server";

import { revalidatePath } from "next/cache";
import { and, eq, sql } from "drizzle-orm";

import { db } from "@/db";
import { ingredients, instructions, recipes } from "@/db/schema";
import { checkAuth } from "@/data/shared";
import type { UpdateRecipePayload } from "@/types";

export async function updateRecipeAction(
  payload: UpdateRecipePayload,
): Promise<{ ok: true } | { ok: false; message: string }> {
  let userId: string;
  try {
    userId = await checkAuth();
  } catch {
    return { ok: false, message: "Unauthorized" };
  }

  const name = payload.name.trim();
  const slug = payload.slug.trim();
  if (!name || !slug) {
    return { ok: false, message: "Name and slug are required." };
  }

  const servings =
    Number.isFinite(payload.servings) && payload.servings >= 1
      ? Math.floor(payload.servings)
      : 1;

  const ingredientRows = payload.ingredients
    .map((row) => ({
      name: row.name.trim(),
      quantity: row.quantity,
      unit: row.unit?.trim() ? row.unit.trim() : null,
    }))
    .filter((row) => row.name.length > 0);

  const instructionRows = payload.instructions
    .map((row) => row.text.trim())
    .filter((text) => text.length > 0);

  try {
    await db.transaction(async (tx) => {
      const rows = await tx
        .update(recipes)
        .set({
          name,
          slug,
          description: payload.description?.trim()
            ? payload.description.trim()
            : null,
          servings,
          prepTime: payload.prepTime,
          cookTime: payload.cookTime,
          categoryId: payload.categoryId,
          updatedAt: sql`(current_timestamp)`,
        })
        .where(
          and(eq(recipes.id, payload.recipeId), eq(recipes.userId, userId)),
        )
        .returning({ id: recipes.id });

      if (rows.length === 0) {
        throw new Error("Recipe not found or access denied.");
      }

      await tx
        .delete(ingredients)
        .where(eq(ingredients.recipeId, payload.recipeId));
      await tx
        .delete(instructions)
        .where(eq(instructions.recipeId, payload.recipeId));

      if (ingredientRows.length > 0) {
        await tx.insert(ingredients).values(
          ingredientRows.map((row) => ({
            recipeId: payload.recipeId,
            name: row.name,
            quantity: row.quantity,
            unit: row.unit,
          })),
        );
      }

      if (instructionRows.length > 0) {
        await tx.insert(instructions).values(
          instructionRows.map((text, index) => ({
            recipeId: payload.recipeId,
            stepNumber: index + 1,
            text,
          })),
        );
      }
    });
  } catch (e) {
    console.error("updateRecipeAction", e);
    return {
      ok: false,
      message: e instanceof Error ? e.message : "Failed to update recipe.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath(`/dashboard/recipes/${slug}`);

  return { ok: true };
}

/*
 * This file is for all recipe-related functions that involve database mutations
 * OR functions that wrap other recipe-related functions for use in client components
 */

"use server";

import { and, eq, ne, sql } from "drizzle-orm";
import { updateTag } from "next/cache";
import { db } from "@/db";
import { ingredients, instructions, recipes } from "@/db/schema";
import { FinalRecipeSchema } from "@/lib/finalRecipeSchema";
import { generatePublicId, generateSlug } from "@/lib/utils";
import { checkAuth } from "./shared";

type SaveRecipeResult =
  | { success: true; slug: string }
  | { success: false; error: string };

function getRecipeBlocksTag(userId: string) {
  return `user:${userId}:recipes:blocks`;
}

function getRecipeSearchTag(userId: string) {
  return `user:${userId}:recipes:search`;
}

function getRecipeCountTag(userId: string) {
  return `user:${userId}:recipes:count`;
}

function getRecipeSlugTag(userId: string, slug: string) {
  return `user:${userId}:recipes:slug:${slug}`;
}

function getPublicRecipeTag(publicId: string) {
  return `public:recipe:${publicId}`;
}

function buildRecipeWriteData(data: FinalRecipeSchema) {
  return {
    recipe: {
      name: data.name,
      description: data.description || null,
      servings: data.servings,
      prepTime: data.prepTime,
      cookTime: data.cookTime,
      categoryId: data.categoryId,
      imageUrl: data.imageUrl || null,
      imageKey: data.imageKey || null,
      ingredientKeywords: data.ingredients
        .map((ingredient) => ingredient.name)
        .join(" "),
    },
    ingredients: data.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit || null,
    })),
    instructions: data.instructions.map((instruction, index) => ({
      displayOrder: index + 1,
      text: instruction.text,
    })),
  };
}

async function generateUniqueRecipeSlug(
  userId: string,
  name: string,
  excludeRecipeId?: number,
): Promise<string> {
  const baseSlug = generateSlug(name);
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existingRecipe = await db.query.recipes.findFirst({
      columns: { id: true },
      where:
        excludeRecipeId === undefined
          ? and(eq(recipes.userId, userId), eq(recipes.slug, candidate))
          : and(
              eq(recipes.userId, userId),
              eq(recipes.slug, candidate),
              ne(recipes.id, excludeRecipeId),
            ),
    });

    if (!existingRecipe) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix++;
  }
}

async function generateUniqueRecipePublicId(): Promise<string> {
  while (true) {
    const candidate = generatePublicId();
    const existingRecipe = await db.query.recipes.findFirst({
      columns: { id: true },
      where: eq(recipes.publicId, candidate),
    });

    if (!existingRecipe) {
      return candidate;
    }
  }
}

function invalidateRecipeCreationTags(userId: string, publicId: string) {
  updateTag(getRecipeBlocksTag(userId));
  updateTag(getRecipeSearchTag(userId));
  updateTag(getRecipeCountTag(userId));
  updateTag(getPublicRecipeTag(publicId));
}

function invalidateRecipeUpdateTags(
  userId: string,
  currentSlug: string,
  nextSlug: string,
  publicId: string,
) {
  updateTag(getRecipeBlocksTag(userId));
  updateTag(getRecipeSearchTag(userId));
  updateTag(getRecipeCountTag(userId));
  updateTag(getRecipeSlugTag(userId, currentSlug));
  updateTag(getPublicRecipeTag(publicId));

  if (nextSlug !== currentSlug) {
    updateTag(getRecipeSlugTag(userId, nextSlug));
  }
}

function invalidateRecipeDeleteTags(
  userId: string,
  slug: string,
  publicId: string,
) {
  updateTag(getRecipeBlocksTag(userId));
  updateTag(getRecipeSearchTag(userId));
  updateTag(getRecipeCountTag(userId));
  updateTag(getRecipeSlugTag(userId, slug));
  updateTag(getPublicRecipeTag(publicId));
}

export async function createRecipe(
  rawData: FinalRecipeSchema,
): Promise<SaveRecipeResult> {
  let userId: string;

  try {
    userId = await checkAuth();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  const data = rawData;
  const {
    recipe,
    ingredients: ingredientRows,
    instructions: instructionRows,
  } = buildRecipeWriteData(data);

  try {
    const slug = await generateUniqueRecipeSlug(userId, data.name);
    const publicId = await generateUniqueRecipePublicId();

    await db.transaction(async (tx) => {
      const [newRecipe] = await tx
        .insert(recipes)
        .values({
          ...recipe,
          slug,
          publicId,
          userId,
        })
        .returning({ id: recipes.id });

      if (ingredientRows.length > 0) {
        await tx.insert(ingredients).values(
          ingredientRows.map((ingredient) => ({
            ...ingredient,
            recipeId: newRecipe.id,
          })),
        );
      }

      if (instructionRows.length > 0) {
        await tx.insert(instructions).values(
          instructionRows.map((instruction) => ({
            ...instruction,
            recipeId: newRecipe.id,
          })),
        );
      }
    });

    invalidateRecipeCreationTags(userId, publicId);
    return { success: true, slug };
  } catch (error) {
    console.error("Failed to create recipe:", error);
    return { success: false, error: "Failed to create recipe." };
  }
}

export async function updateRecipe(
  currentSlug: string,
  rawData: FinalRecipeSchema,
): Promise<SaveRecipeResult> {
  let userId: string;

  try {
    userId = await checkAuth();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  const existingRecipe = await db.query.recipes.findFirst({
    columns: {
      id: true,
      name: true,
      slug: true,
      publicId: true,
    },
    where: and(eq(recipes.userId, userId), eq(recipes.slug, currentSlug)),
  });

  if (!existingRecipe) {
    return { success: false, error: "Recipe not found." };
  }

  const data = rawData;
  const {
    recipe,
    ingredients: ingredientRows,
    instructions: instructionRows,
  } = buildRecipeWriteData(data);

  try {
    const nextSlug =
      data.name === existingRecipe.name
        ? existingRecipe.slug
        : await generateUniqueRecipeSlug(userId, data.name, existingRecipe.id);

    await db.transaction(async (tx) => {
      await tx
        .update(recipes)
        .set({
          ...recipe,
          slug: nextSlug,
          updatedAt: sql`(current_timestamp)`,
        })
        .where(eq(recipes.id, existingRecipe.id));

      await tx
        .delete(ingredients)
        .where(eq(ingredients.recipeId, existingRecipe.id));
      await tx
        .delete(instructions)
        .where(eq(instructions.recipeId, existingRecipe.id));

      if (ingredientRows.length > 0) {
        await tx.insert(ingredients).values(
          ingredientRows.map((ingredient) => ({
            ...ingredient,
            recipeId: existingRecipe.id,
          })),
        );
      }

      if (instructionRows.length > 0) {
        await tx.insert(instructions).values(
          instructionRows.map((instruction) => ({
            ...instruction,
            recipeId: existingRecipe.id,
          })),
        );
      }
    });

    invalidateRecipeUpdateTags(
      userId,
      currentSlug,
      nextSlug,
      existingRecipe.publicId,
    );
    return { success: true, slug: nextSlug };
  } catch (error) {
    console.error("Failed to update recipe:", error);
    return { success: false, error: "Failed to update recipe." };
  }
}

export async function deleteRecipe(
  slug: string,
): Promise<{ success: true } | { success: false; error: string }> {
  let userId: string;

  try {
    userId = await checkAuth();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  const existingRecipe = await db.query.recipes.findFirst({
    columns: {
      id: true,
      publicId: true,
    },
    where: and(eq(recipes.userId, userId), eq(recipes.slug, slug)),
  });

  if (!existingRecipe) {
    return { success: false, error: "Recipe not found." };
  }

  try {
    await db.delete(recipes).where(eq(recipes.id, existingRecipe.id));
    invalidateRecipeDeleteTags(userId, slug, existingRecipe.publicId);
    return { success: true };
  } catch (error) {
    console.error("Failed to delete recipe:", error);
    return { success: false, error: "Failed to delete recipe." };
  }
}

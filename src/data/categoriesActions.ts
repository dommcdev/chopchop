/*
 * This file is for all category-related functions that involve database mutations
 * OR functions that wrap other category-related functions for use in client components
 */

"use server";

import { and, eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { db } from "@/db";
import { categories, recipes } from "@/db/schema";
import { generateSlug } from "@/lib/utils";
import type { CategoryBrief } from "@/types";
import { checkAuth } from "./shared";

type MutationResult<T = void> = T extends void
  ? { success: true } | { success: false; error: string }
  : ({ success: true } & T) | { success: false; error: string };

type CreateCategoryResult = MutationResult<{ category: CategoryBrief }>;
type RenameCategoryResult = MutationResult<{ slug: string }>;
type DeleteCategoryResult = MutationResult;

function getCategoriesTag(userId: string) {
  return `categories-${userId}`;
}

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

function invalidateCategoryTags(userId: string) {
  updateTag(getCategoriesTag(userId));
}

function invalidateRecipeTagsForCategory(
  userId: string,
  affectedRecipes: Array<{ slug: string; publicId: string }>,
) {
  updateTag(getRecipeBlocksTag(userId));
  updateTag(getRecipeSearchTag(userId));
  updateTag(getRecipeCountTag(userId));

  for (const recipe of affectedRecipes) {
    updateTag(getRecipeSlugTag(userId, recipe.slug));
    updateTag(getPublicRecipeTag(recipe.publicId));
  }
}

async function generateUniqueCategorySlug(
  userId: string,
  name: string,
): Promise<string> {
  const baseSlug = generateSlug(name);
  let candidate = baseSlug;
  let suffix = 2;

  while (true) {
    const existingCategory = await db.query.categories.findFirst({
      columns: { id: true },
      where: and(eq(categories.userId, userId), eq(categories.slug, candidate)),
    });

    if (!existingCategory) {
      return candidate;
    }

    candidate = `${baseSlug}-${suffix}`;
    suffix++;
  }
}

export async function createCategory(
  rawName: string,
): Promise<CreateCategoryResult> {
  const name = rawName.trim();

  if (!name) {
    return { success: false, error: "Category name is required." };
  }

  let userId: string;

  try {
    userId = await checkAuth();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const slug = await generateUniqueCategorySlug(userId, name);

    const [category] = await db
      .insert(categories)
      .values({
        name,
        slug,
        userId,
      })
      .returning({
        id: categories.id,
        name: categories.name,
        slug: categories.slug,
      });

    invalidateCategoryTags(userId);

    return { success: true, category };
  } catch (error) {
    console.error("Failed to create category:", error);
    return { success: false, error: "Failed to create category." };
  }
}

export async function renameCategory(
  categorySlug: string,
  rawName: string,
): Promise<RenameCategoryResult> {
  const name = rawName.trim();

  if (!name) {
    return { success: false, error: "Category name is required." };
  }

  let userId: string;

  try {
    userId = await checkAuth();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const existing = await db.query.categories.findFirst({
      columns: { id: true },
      where: and(
        eq(categories.userId, userId),
        eq(categories.slug, categorySlug),
      ),
    });

    if (!existing) {
      return { success: false, error: "Category not found." };
    }

    const affectedRecipes = await db.query.recipes.findMany({
      columns: {
        slug: true,
        publicId: true,
      },
      where: and(
        eq(recipes.userId, userId),
        eq(recipes.categoryId, existing.id),
      ),
    });

    const newSlug = await generateUniqueCategorySlug(userId, name);

    await db
      .update(categories)
      .set({ name, slug: newSlug })
      .where(
        and(eq(categories.userId, userId), eq(categories.slug, categorySlug)),
      );

    invalidateCategoryTags(userId);
    invalidateRecipeTagsForCategory(userId, affectedRecipes);

    return { success: true, slug: newSlug };
  } catch (error) {
    console.error("Failed to rename category:", error);
    return { success: false, error: "Failed to rename category." };
  }
}

export async function deleteCategory(
  categorySlug: string,
): Promise<DeleteCategoryResult> {
  let userId: string;

  try {
    userId = await checkAuth();
  } catch {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const existing = await db.query.categories.findFirst({
      columns: { id: true },
      where: and(
        eq(categories.userId, userId),
        eq(categories.slug, categorySlug),
      ),
    });

    if (!existing) {
      return { success: false, error: "Category not found." };
    }

    const affectedRecipes = await db.query.recipes.findMany({
      columns: {
        slug: true,
        publicId: true,
      },
      where: and(
        eq(recipes.userId, userId),
        eq(recipes.categoryId, existing.id),
      ),
    });

    await db
      .update(recipes)
      .set({ categoryId: null })
      .where(eq(recipes.categoryId, existing.id));

    await db
      .delete(categories)
      .where(
        and(eq(categories.userId, userId), eq(categories.slug, categorySlug)),
      );

    invalidateCategoryTags(userId);
    invalidateRecipeTagsForCategory(userId, affectedRecipes);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Failed to delete category." };
  }
}

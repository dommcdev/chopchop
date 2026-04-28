/*
 * This file is for all category-related functions that involve database mutations
 * OR functions that wrap other category-related functions for use in client components
 */

"use server";

import { and, eq } from "drizzle-orm";
import { updateTag } from "next/cache";

import { db } from "@/db";
import { categories } from "@/db/schema";
import { generateSlug } from "@/lib/utils";
import { checkAuth } from "./shared";

type MutationResult<T = void> = T extends void
  ? { success: true } | { success: false; error: string }
  : ({ success: true } & T) | { success: false; error: string };

type CreateCategoryResult = MutationResult<{ slug: string }>;
type RenameCategoryResult = MutationResult<{ slug: string }>;
type DeleteCategoryResult = MutationResult;

function getCategoriesTag(userId: string) {
  return `categories-${userId}`;
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

    await db.insert(categories).values({
      name,
      slug,
      userId,
    });

    updateTag(getCategoriesTag(userId));

    return { success: true, slug };
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

    const newSlug = await generateUniqueCategorySlug(userId, name);

    await db
      .update(categories)
      .set({ name, slug: newSlug })
      .where(
        and(eq(categories.userId, userId), eq(categories.slug, categorySlug)),
      );

    updateTag(getCategoriesTag(userId));

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

    await db
      .delete(categories)
      .where(
        and(eq(categories.userId, userId), eq(categories.slug, categorySlug)),
      );

    updateTag(getCategoriesTag(userId));

    return { success: true };
  } catch (error) {
    console.error("Failed to delete category:", error);
    return { success: false, error: "Failed to delete category." };
  }
}

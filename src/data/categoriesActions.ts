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

type CreateCategoryResult =
  | { success: true; slug: string }
  | { success: false; error: string };

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

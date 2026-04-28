/*
 * This file is for all category-related functions that involve database reads
 *
 * Each function requires both a private cachable version which takes in userId as props and utlizes 'use cache'
 * and a public version which actually awaits auth then simply calls the private version.
 *
 * Naming convention: fetchName for public, queryName for private.
 */

import "server-only";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";
import { checkAuth } from "./shared";
import { cacheTag } from "next/cache";

function getCategoriesTag(userId: string) {
  return `categories-${userId}`;
}

async function queryCategories(userId: string) {
  "use cache";
  cacheTag(getCategoriesTag(userId));

  //  await new Promise((resolve) => setTimeout(resolve, 1500));
  return await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .where(eq(categories.userId, userId))
    .orderBy(sql`lower(${categories.name})`);
}

async function queryCategoryNameFromSlug(userId: string, slug: string) {
  "use cache";
  cacheTag(getCategoriesTag(userId));

  const category = await db.query.categories.findFirst({
    columns: {
      name: true,
    },
    where: and(eq(categories.userId, userId), eq(categories.slug, slug)),
  });

  return category?.name ?? null;
}

export async function fetchCategories() {
  const userId = await checkAuth();
  return queryCategories(userId);
}

export async function fetchCategoryNameFromSlug(slug: string) {
  const userId = await checkAuth();
  return queryCategoryNameFromSlug(userId, slug);
}

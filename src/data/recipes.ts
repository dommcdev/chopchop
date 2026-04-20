/*
 * This file is for all recipe-related functions that involve database reads
 */

import "server-only";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { and, or, eq, count } from "drizzle-orm";
import { RecipeSearchItem } from "@/types";
import { checkAuth } from "./shared";
import { cacheTag } from "next/cache";

// Fetch block of recipes
async function queryRecipesBlock(
  userId: string,
  limit: number,
  offset: number,
) {
  "use cache";
  cacheTag(`recipes-${userId}`);

  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  return await db.query.recipes.findMany({
    where: eq(recipes.userId, userId),
    orderBy: (r, { desc: descCol }) => [descCol(r.createdAt)],
    limit,
    offset, //nota bene - db still reads everything up to this point, but then simply discards most of it (ok but not ideal)
    with: {
      category: true,
    },
  });
}

export async function fetchRecipesBlock(limit: number, offset: number) {
  const userId = await checkAuth();
  return queryRecipesBlock(userId, limit, offset);
}

// Fetch all recipes for a user, for use in search
async function querySearchData(userId: string): Promise<RecipeSearchItem[]> {
  "use cache";
  cacheTag(`recipes-${userId}`);

  return await db.query.recipes.findMany({
    where: eq(recipes.userId, userId),
    columns: {
      id: true,
      slug: true,
      name: true,
      description: true,
      ingredientKeywords: true,
    },
    with: {
      category: {
        columns: { name: true },
      },
    },
  });
}

export async function fetchSearchData(): Promise<RecipeSearchItem[]> {
  const userId = await checkAuth();
  return querySearchData(userId);
}

//TODO why do we have the or stuff here
async function queryRecipeBlob(userId: string, slug: string) {
  "use cache";
  cacheTag(`recipes-${userId}`);

  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  return await db.query.recipes.findFirst({
    where: and(
      eq(recipes.userId, userId),
      or(eq(recipes.slug, slug), eq(recipes.publicId, slug)),
    ),
    with: {
      category: true,
      ingredients: {
        orderBy: (ingredients, { asc }) => [asc(ingredients.id)],
      },
      instructions: {
        orderBy: (instructions, { asc }) => [asc(instructions.stepNumber)],
      },
    },
  });
}

export async function fetchRecipeBlob(slug: string) {
  const userId = await checkAuth();
  return queryRecipeBlob(userId, slug);
}

async function queryRecipeSlugFromPublicId(publicId: string) {
  "use cache";
  cacheTag(`recipes-${publicId}`);

  const result = await db.query.recipes.findFirst({
    columns: {
      slug: true,
    },
    where: eq(recipes.publicId, publicId),
  });

  return result?.slug ?? null;
}

export async function getRecipeSlugFromPublicId(publicId: string) {
  return queryRecipeSlugFromPublicId(publicId);
}

async function queryNumOfPages(userId: string, pageSize: number) {
  "use cache";
  cacheTag(`recipes-${userId}`);

  const result = await db
    .select({ value: count() })
    .from(recipes)
    .where(eq(recipes.userId, userId));

  const totalCount = result[0].value;
  return Math.ceil(totalCount / pageSize);
}

export async function getNumOfPages(pageSize: number) {
  const userId = await checkAuth();
  return queryNumOfPages(userId, pageSize);
}

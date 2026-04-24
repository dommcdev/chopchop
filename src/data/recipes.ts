/*
 * This file is for all recipe-related functions that involve database reads
 *
 * Each function requires both a private cachable version which takes in userId as props and utlizes 'use cache'
 * and a public version which actually awaits auth then simply calls the private version.
 *
 * Naming convention: fetchName for public, queryName for private.
 */

import "server-only";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { and, eq, count } from "drizzle-orm";
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

  return await db.query.recipes.findMany({
    where: eq(recipes.userId, userId),
    orderBy: (r, { desc: descCol }) => [descCol(r.createdAt)],
    limit,
    offset, //nota bene - db still reads everything up to this point, but then simply discards most of it
    with: {
      category: true,
    },
  });
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

async function queryRecipeDetailsBySlug(userId: string, slug: string) {
  "use cache";
  cacheTag(`recipes-${userId}`);

  return await db.query.recipes.findFirst({
    where: and(eq(recipes.userId, userId), eq(recipes.slug, slug)),
    with: {
      category: true,
      ingredients: {
        orderBy: (ingredients, { asc }) => [asc(ingredients.id)],
      },
      instructions: {
        orderBy: (instructions, { asc }) => [asc(instructions.displayOrder)],
      },
    },
  });
}

async function queryRecipeDetailsById(publicId: string) {
  "use cache";
  cacheTag(`recipes-${publicId}`);

  return await db.query.recipes.findFirst({
    where: eq(recipes.publicId, publicId),
    with: {
      category: true,
      ingredients: {
        orderBy: (ingredients, { asc }) => [asc(ingredients.id)],
      },
      instructions: {
        orderBy: (instructions, { asc }) => [asc(instructions.displayOrder)],
      },
    },
  });
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

export async function getRecipeDetailsBySlug(slug: string) {
  const userId = await checkAuth();
  return queryRecipeDetailsBySlug(userId, slug);
}

export async function getRecipeDetailsById(publicId: string) {
  return queryRecipeDetailsById(publicId);
}

export async function fetchRecipesBlock(limit: number, offset: number) {
  const userId = await checkAuth();
  return queryRecipesBlock(userId, limit, offset);
}

export async function fetchSearchData(): Promise<RecipeSearchItem[]> {
  const userId = await checkAuth();
  return querySearchData(userId);
}

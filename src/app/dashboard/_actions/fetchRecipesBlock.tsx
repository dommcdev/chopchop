"use server";

import { db } from "@/db";
import { recipes } from "@/db/schema";
import { desc } from "drizzle-orm";
import RecipeCard from "@/app/dashboard/_components/RecipeCard";

export async function fetchRecipesBlock(page: number) {
  const limit = 6; // How many to load at once
  const offset = page * limit; // Skip the ones we already have

  const data = await db.select()
    .from(recipes)
    .orderBy(desc(recipes.createdAt))
    .limit(limit)
    .offset(offset);

  if (data.length === 0) return null;

  return (
    <>
      {data.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
}

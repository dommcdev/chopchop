import { db } from "@/db";
import { recipes } from "@/db/schema";
import { desc } from "drizzle-orm";

// Standard paginated fetch
export async function getRecipes(limit: number = 6, offset: number = 0) {
  return await db
    .select()
    .from(recipes)
    .orderBy(desc(recipes.createdAt))
    .limit(limit)
    .offset(offset);
}

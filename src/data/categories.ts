import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { checkAuth } from "./shared";

export const getCategoriesForUser = cache(async () => {
  const userId = await checkAuth();
  return await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .where(eq(categories.userId, userId));
});

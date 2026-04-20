import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cache } from "react";
import { checkAuth } from "./shared";

export const fetchCategories = cache(async () => {
  const userId = await checkAuth();
  await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate network delay

  return await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .where(eq(categories.userId, userId));
});

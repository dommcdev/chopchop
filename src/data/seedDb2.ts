"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { categories, recipes, ingredients, instructions } from "@/db/schema";
import { revalidatePath } from "next/cache";

export async function seedDatabaseAction() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("You must be logged in to seed data.");
  }

  try {
    // 1. Create a "Layout Test" Category
    const [category] = await db
      .insert(categories)
      .values({
        name: "Italian Masterpieces",
        slug: "italian-masterpieces",
        userId,
        imageUrl:
          "https://images.unsplash.com/photo-1498579150354-977475b7ea0b",
      })
      .returning();

    // 2. Insert the "Big Lasagna" (For Layout Testing)
    const [recipe] = await db
      .insert(recipes)
      .values({
        name: "Traditional Homemade Beef Lasagna",
        slug: "traditional-homemade-beef-lasagna-" + Date.now(),
        publicId: Math.random().toString(36).substring(2, 10),
        userId,
        description:
          "A rich, layered classic featuring a slow-simmered bolognese sauce. This recipe is designed to test long descriptions and multi-line text wrapping in your UI.",
        servings: 8,
        prepTime: 45,
        cookTime: 180,
        categoryId: category.id,
      })
      .returning();

    // 3. Add bulky Ingredients
    await db.insert(ingredients).values([
      {
        recipeId: recipe.id,
        name: "Ground Beef (80/20 fat content for flavor)",
        quantity: 2,
        unit: "lbs",
      },
      {
        recipeId: recipe.id,
        name: "Extra Large Lasagna Noodles (Pre-boiled)",
        quantity: 12,
        unit: "pieces",
      },
      {
        recipeId: recipe.id,
        name: "Whole Milk Ricotta Cheese",
        quantity: 15,
        unit: "oz",
      },
      {
        recipeId: recipe.id,
        name: "Freshly Grated Parmesan Reggiano",
        quantity: 0.5,
        unit: "cup",
      },
    ]);

    // 4. Add long-winded Instructions
    await db.insert(instructions).values([
      {
        recipeId: recipe.id,
        stepNumber: 1,
        text: "In a large Dutch oven, brown the meat thoroughly. This step is vital for the Maillard reaction, which creates the deep savory flavors you want in a traditional lasagna. Drain the fat carefully before moving to the next step.",
      },
      {
        recipeId: recipe.id,
        stepNumber: 2,
        text: "Layer the noodles carefully. If they overlap too much, they won't cook evenly. Ensure every inch of the noodle is covered in sauce to prevent 'crunchy corners'—unless you like those, in which case, leave the edges exposed to the dry heat of the oven.",
      },
    ]);

    revalidatePath("/"); // Update the cache
    return { success: true };
  } catch (error) {
    console.error("Seed error:", error);
    return { success: false, error: "Failed to seed database." };
  }
}

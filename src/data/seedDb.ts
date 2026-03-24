"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { categories, recipes, ingredients, instructions } from "@/db/schema";
import { revalidatePath } from "next/cache";

const CATEGORY_NAMES = [
  "Italian",
  "Mexican",
  "Chinese",
  "Indian",
  "Japanese",
  "Thai",
  "French",
  "Spanish",
  "Greek",
  "American",
  "Mediterranean",
  "Keto",
  "Vegan",
  "Vegetarian",
  "Desserts",
  "Breakfast",
  "Seafood",
  "Salads",
  "Pasta",
  "Soup",
];

const RECIPE_NAMES = [
  "Classic Margherita Pizza",
  "Taco al Pastor",
  "Kung Pao Chicken",
  "Butter Chicken",
  "Sushi Rolls",
  "Pad Thai",
  "Croissant",
  "Paella",
  "Moussaka",
  "Cheeseburger",
  "Hummus Plate",
  "Keto Steak",
  "Vegan Bowl",
  "Veggie Stir-fry",
  "Chocolate Cake",
  "Pancakes",
  "Grilled Salmon",
  "Caesar Salad",
  "Spaghetti Carbonara",
  "Tomato Soup",
  "Ramen",
  "Beef Wellington",
  "Fish and Chips",
  "Pho",
  "Falafel",
  "Ratatouille",
  "Tiramisu",
  "Eggs Benedict",
  "Lobster Bisque",
  "Tandoori Chicken",
  "Quesadilla",
  "Bibimbap",
  "Gyoza",
  "Spring Rolls",
  "Baklava",
  "Churro",
  "Gelato",
  "Goulash",
  "Ceviche",
  "Peking Duck",
  "Risotto",
  "Linguine with Clams",
  "Shrimp Scampi",
  "Chicken Piccata",
  "Eggplant Parmesan",
  "Minestrone",
  "Clam Chowder",
  "French Onion Soup",
  "Gazpacho",
  "Wonton Soup",
];

const INGREDIENTS = [
  "Salt",
  "Pepper",
  "Olive Oil",
  "Garlic",
  "Onion",
  "Tomato",
  "Chicken",
  "Beef",
  "Flour",
  "Sugar",
  "Milk",
  "Eggs",
  "Butter",
  "Lemon",
  "Parsley",
  "Basil",
  "Ginger",
  "Soy Sauce",
  "Rice",
  "Pasta",
];

const INSTRUCTIONS = [
  "Preheat the oven.",
  "Chop the vegetables.",
  "Heat the pan.",
  "Mix the ingredients.",
  "Cook for 20 minutes.",
  "Serve hot.",
  "Garnish with herbs.",
  "Whisk until smooth.",
  "Simmer on low heat.",
  "Boil water in a large pot.",
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

function generatePublicId() {
  return Math.random().toString(36).substring(2, 10);
}

export async function fillDatabase() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    // 1. Insert Categories
    const insertedCategories = [];
    for (const name of CATEGORY_NAMES) {
      const [newCategory] = await db
        .insert(categories)
        .values({
          name,
          slug: slugify(name),
          userId,
        })
        .returning();
      insertedCategories.push(newCategory);
    }

    // 2. Insert Recipes
    for (let i = 0; i < 50; i++) {
      const name =
        RECIPE_NAMES[i % RECIPE_NAMES.length] +
        (i >= RECIPE_NAMES.length
          ? ` ${Math.floor(i / RECIPE_NAMES.length)}`
          : "");
      const category =
        insertedCategories[
          Math.floor(Math.random() * insertedCategories.length)
        ];

      const [newRecipe] = await db
        .insert(recipes)
        .values({
          name,
          slug: slugify(name),
          userId,
          publicId: generatePublicId(),
          description: `This is a delicious ${name} recipe. Perfect for any occasion.`,
          servings: Math.floor(Math.random() * 4) + 1,
          prepTime: Math.floor(Math.random() * 30) + 10,
          cookTime: Math.floor(Math.random() * 60) + 15,
          categoryId: category.id,
        })
        .returning();

      // 3. Insert Ingredients for each recipe
      const ingredientsToInsert = [];
      for (let j = 0; j < 5; j++) {
        ingredientsToInsert.push({
          recipeId: newRecipe.id,
          name: INGREDIENTS[Math.floor(Math.random() * INGREDIENTS.length)],
          quantity: Math.floor(Math.random() * 5) + 1,
          unit: "unit",
        });
      }
      await db.insert(ingredients).values(ingredientsToInsert);

      // 4. Insert Instructions for each recipe
      const instructionsToInsert = [];
      for (let j = 0; j < 5; j++) {
        instructionsToInsert.push({
          recipeId: newRecipe.id,
          stepNumber: j + 1,
          text: INSTRUCTIONS[Math.floor(Math.random() * INSTRUCTIONS.length)],
        });
      }
      await db.insert(instructions).values(instructionsToInsert);
    }

    revalidatePath("/dashboard");
    return {
      success: true,
      message: "Database filled with 20 categories and 50 recipes!",
    };
  } catch (error) {
    console.error("Failed to seed database:", error);
    return { success: false, message: "Failed to seed database." };
  }
}

import { Recipe, Category, Ingredient } from "@/db/schema";
import { fetchRecipesBlock } from "@/data/recipes";

export type RecipeWithCategory = Awaited<
  ReturnType<typeof fetchRecipesBlock>
>[number];

export type UpdateRecipePayload = {
  recipeId: number;
  name: string;
  slug: string;
  description: string | null;
  servings: number;
  prepTime: number | null;
  cookTime: number | null;
  categoryId: number | null;
  ingredients: Array<{
    name: string;
    quantity: number | null;
    unit: string | null;
  }>;
  instructions: Array<{ text: string }>;
};

export type PrintableRecipe = Pick<
  Recipe,
  "name" | "servings" | "description"
> & {
  instructions: Array<{
    id: number;
    text: string;
  }>;
};

export type PrintableScaledIngredient = Pick<
  Ingredient,
  "id" | "name" | "unit"
> & {
  scaledAmount: number | null;
};

export type RecipeSearchItem = Pick<
  Recipe,
  "id" | "slug" | "name" | "description"
> & {
  category: Pick<Category, "name"> | null;
};

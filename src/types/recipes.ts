import { Recipe, Category, Ingredient } from "@/db/schema";

export type RecipeWithCategory = Recipe & {
  category: Category | null;
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

export type RecipeWithDetails = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  servings: number;
  prepTime: number | null;
  cookTime: number | null;
  categoryId: number | null;
  categoryName: string | null;
  ingredients: Array<{
    id: number;
    name: string;
    quantity: number | null;
    unit: string | null;
  }>;
  createdAt: string;
  updatedAt: string;
};

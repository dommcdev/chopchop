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

export type RecipeSearchItem = Pick<
  Recipe,
  "id" | "slug" | "name" | "description"
> & {
  category: Pick<Category, "name"> | null;
  ingredients: Array<Pick<Ingredient, "name">>;
};

import { Recipe, Category, Ingredient } from "@/db/schema";
import { fetchRecipeDetailsBySlug, fetchRecipesBlock } from "@/data/recipes";

export type RecipeWithCategory = Awaited<
  ReturnType<typeof fetchRecipesBlock>
>[number];

export type RecipeDetailsResult = Awaited<
  ReturnType<typeof fetchRecipeDetailsBySlug>
>;

export type RecipeDetails = NonNullable<RecipeDetailsResult>;

export type PrintableRecipe = Pick<
  Recipe,
  "name" | "servings" | "description" | "prepTime" | "cookTime" | "publicId"
> & {
  ingredients: Array<Pick<Ingredient, "id" | "name" | "quantity" | "unit">>;
  instructions: Array<{
    id: number;
    text: string;
  }>;
  category: Pick<Category, "name"> | null;
};

export type RecipeSearchItem = Pick<
  Recipe,
  "id" | "slug" | "name" | "description" | "ingredientKeywords"
> & {
  category: Pick<Category, "name"> | null;
};

import { Recipe, Category, Ingredient } from "@/db/schema";
import { fetchRecipeBlob, fetchRecipesBlock } from "@/data/recipes";

export type RecipeWithCategory = Awaited<
  ReturnType<typeof fetchRecipesBlock>
>[number];

export type RecipeBlob = NonNullable<
  Awaited<ReturnType<typeof fetchRecipeBlob>>
>;

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
  "name" | "servings" | "description" | "prepTime" | "cookTime" | "publicId"
> & {
  instructions: Array<{
    id: number;
    text: string;
  }>;
  category: Pick<Category, "name"> | null;
};

export type PrintableScaledIngredient = Pick<
  Ingredient,
  "id" | "name" | "unit"
> & {
  scaledAmount: number | null;
};

export type RecipeSearchItem = Pick<
  Recipe,
  "id" | "slug" | "name" | "description" | "ingredientKeywords"
> & {
  category: Pick<Category, "name"> | null;
};

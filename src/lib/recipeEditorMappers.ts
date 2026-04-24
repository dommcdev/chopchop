import { GeminiRecipeSchema } from "@/lib/geminiRecipeSchema";
import {
  EMPTY_RECIPE_EDITOR_VALUES,
  RecipeEditorInitialValues,
  hookformSchema,
} from "@/lib/hookformSchema";
import { RecipeBlob } from "@/types";

export function geminiToRecipeEditorInitialValues(
  data: GeminiRecipeSchema,
): RecipeEditorInitialValues {
  return hookformSchema.parse({
    ...EMPTY_RECIPE_EDITOR_VALUES,
    ...data,
  });
}

export function recipeBlobToRecipeEditorInitialValues(
  data: RecipeBlob,
): RecipeEditorInitialValues {
  return hookformSchema.parse({
    name: data.name,
    description: data.description,
    servings: data.servings,
    prepTime: data.prepTime,
    cookTime: data.cookTime,
    categoryId: data.category?.id,
    imageUrl: data.imageUrl,
    imageKey: data.imageKey,
    ingredients: data.ingredients.map((ingredient) => ({
      name: ingredient.name,
      quantity: ingredient.quantity,
      unit: ingredient.unit,
    })),
    instructions: data.instructions.map((instruction) => ({
      text: instruction.text,
    })),
  });
}

// NOTE: Any changes in this file may require changes in the accompanying recipe-schema.ts file

import { z } from "zod";

export const recipeEditorSchema = z.object({
  name: z.string(),
  description: z.string().default(""),
  servings: z.literal("").or(z.coerce.number().min(1).optional()),
  prepTime: z.literal("").or(z.coerce.number().min(0).optional()),
  cookTime: z.literal("").or(z.coerce.number().min(0).optional()),
  ingredients: z
    .array(
      z.object({
        name: z.string(),
        quantity: z.literal("").or(z.coerce.number().min(0).optional()),
        unit: z.string().default(""),
      }),
    )
    .default([]),
  instructions: z.array(z.string()).default([]),
});

export type RecipeEditorSchema = z.infer<typeof recipeEditorSchema>;

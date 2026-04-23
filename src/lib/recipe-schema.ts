//Numbers must have a min and be nullable, strings must have a default("")
//Names are the only fields that are not nullable/default-able/optional

import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export const fileUploadSchema = z
  .instanceof(File)
  .refine(
    (file) => file.size <= MAX_FILE_SIZE,
    `Max file size is ${MAX_FILE_SIZE / (1024 * 1024)}MB.`,
  )
  .refine(
    (file) => ACCEPTED_TYPES.includes(file.type),
    "Only .jpg, .png, .webp and .pdf are supported.",
  );

export const recipeSchema = z.object({
  name: z.string().describe("The name of the dish"),
  description: z
    .string()
    .default("")
    .describe(
      "The description of the dish. If not applicable, return an empty string.",
    ),
  servings: z
    .number()
    .min(1, "Servings must be at least 1.")
    .nullable()
    .describe("Number of servings. If none are listed, return null"),
  prepTime: z
    .number()
    .min(0)
    .nullable()
    .describe(
      "Preparation time in minutes. If no preparation time is mentioned, return null.",
    ),
  cookTime: z
    .number()
    .min(0)
    .nullable()
    .describe(
      "Cooking time in minutes. If no cooking time is mentioned, return null.",
    ),
  ingredients: z
    .array(
      z.object({
        name: z
          .string()
          .describe(
            "The name of the ingredient, with special instructions if included, e.g. 'Butter (softened)'",
          ),
        quantity: z
          .number()
          .min(0)
          .nullable()
          .describe(
            "The numeric quantity. Convert words like 'half' to 0.5. If the quantity is an implicit singular (e.g., 'a pinch', 'a dash', 'juice of one lemon'), return 1. If it is purely descriptive with no math possible (e.g., 'salt to taste', 'garnish'), return null.",
          ),
        unit: z
          .string()
          .describe(
            "The standard unit of measurement. If not unit is mentioned (e.g., '1 onion' return an empty string.)",
          ),
      }),
    )
    .default([]),
  instructions: z
    .array(z.string())
    .describe("Step-by-step instructions to prepare the dish")
    .default([]),
});

// This line extracts the TypeScript type from the Zod schema
export type RecipeSchema = z.infer<typeof recipeSchema>;

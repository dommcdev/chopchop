//Numbers must have a min and be nullable, strings must have a default("")
// NOTE: Any changes in this file may require changes in the accompanying recipe-schema.ts file

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

// Helper for AI strings: Forces AI to return a string or null,
// then transforms null to "" for your application logic.
const aiString = (description: string) =>
  z
    .string()
    .nullable()
    .describe(`${description}. If not present, return null.`)
    .transform((val) => val ?? "");

const numOrNull = (minVal: number, aiMsg: string) =>
  z
    .number()
    .min(minVal)
    .nullable()
    .describe(`${aiMsg}. If not present, return null.`);

export const recipeSchema = z.object({
  // Name is the only field forced to be a non-zero-length string
  name: z
    .string()
    .min(1, "Recipe name is required")
    .describe("The name of the dish"),

  description: aiString("A brief description of the dish"),

  servings: numOrNull(1, "Number of servings"),
  prepTime: numOrNull(0, "Prep time in minutes"),
  cookTime: numOrNull(0, "Cook time in minutesl"),

  ingredients: z
    .array(
      z.object({
        name: aiString("Ingredient name (e.g., 'Butter')"),
        quantity: numOrNull(
          0,
          "Numeric quantity. Words like 'half' to 0.5. If descriptive only, return null.",
        ),
        unit: aiString(
          "Standard unit (e.g., 'cups', 'tbsp'). If none, return null.",
        ),
      }),
    )
    .transform((ings) => ings.filter((i) => i.name !== ""))
    .default([]),

  instructions: z
    .array(z.string())
    .nullable()
    .describe("Step-by-step instructions. If none are found, return null.")
    .transform((steps) => (steps ?? []).filter((s) => s.trim() !== ""))
    .default([]),
});

// This line extracts the TypeScript type from the Zod schema
export type RecipeSchema = z.infer<typeof recipeSchema>;

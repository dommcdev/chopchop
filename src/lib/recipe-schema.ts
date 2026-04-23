// Postel's Law - "Be conservative in what you do, be liberal in what you accept from others."
// NOTE: Any changes in this file may require changes in the other schema files
// This schema strictly enforces the shape of the data Gemini produces
// Numbers must be a valid number for the field or null
// Strings must be a valid (trimmed) string for the field or null
// Arrays must not have any rows with only ""
// We then post-process any *string* nulls into "" for easier logic elsewhere

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

const stringOrNull = (description: string) =>
  z
    .string()
    .nullable()
    .describe(`${description}. If not present, return null.`)
    .transform((val) => val?.trim() ?? "");

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
    .transform((val) => val.trim())
    .describe("The name of the dish"),

  description: stringOrNull("A brief description of the dish"),

  servings: numOrNull(1, "Number of servings"),
  prepTime: numOrNull(0, "Prep time in minutes"),
  cookTime: numOrNull(0, "Cook time in minutesl"),

  ingredients: z
    .array(
      z.object({
        name: stringOrNull(
          "Ingredient name with special instructions if present (e.g. 'Butter, softened')",
        ),
        quantity: numOrNull(
          0,
          "Numeric quantity. Words like 'half' to 0.5. If descriptive only, return null.",
        ),
        unit: stringOrNull(
          "Standard unit (e.g., 'cups', 'tbsp'). Use abbreviations when possible. If none, return null.",
        ),
      }),
    )
    .transform((ings) => ings.filter((i) => i.name.trim() !== ""))
    .default([]),

  instructions: z
    .array(z.object({ step: stringOrNull("A single instruction step") }))
    .nullable()
    .describe("Step-by-step instructions. If none are found, return null.")
    .transform((steps) => (steps ?? []).filter((item) => item.step !== "")) //remove whitespace-only steps
    .default([]),
});

// This line extracts the TypeScript type from the Zod schema
export type RecipeSchema = z.infer<typeof recipeSchema>;

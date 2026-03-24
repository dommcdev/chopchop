//Notes
//We may need to adjust recipe prompts if it can't handle stuff like "juice of half a lemon" or "3 cloves of garlic, cold-pressed" well.
//Nit-picking, but preptime and cooktime are just strings currently (rather than time + unit of time)
//Do we want to add more top-level metadata, e.g. rating, difficulty, etc?

import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

export const FileUploadSchema = z
  .instanceof(File)
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max size is 5MB.`)
  .refine(
    (file) => ACCEPTED_TYPES.includes(file.type),
    "Only .jpg, .png, .webp and .pdf are supported.",
    //TODO Need to pass this message along to the user in the ui
  );

const UnitEnum = z.enum([
  "gram",
  "kilogram",
  "ml",
  "liter",
  "tsp",
  "tbsp",
  "cup",
  "oz",
  "lb",
  "each",
  "to taste",
]);

export const RecipeSchema = z.object({
  name: z.string().describe("The name of the dish"),
  description: z.string().optional().describe("The description of the dish"),
  servings: z.number().nullable(),
  prepTime: z
    .number()
    .nullable()
    .describe("Preparation time in minutes, e.g. 15"),
  cookTime: z.number().nullable().describe("Cooking time in minutes, e.g. 30"),
  ingredients: z.array(
    z.object({
      name: z
        .string()
        .describe(
          "The name of the ingredient, with special instructions if included, e.g. 'Butter (softened)'",
        ),
      quantity: z
        .number()
        .describe(
          "The numeric quantity only. Convert fractions like 1/2 to 0.5",
        ),
      unit: UnitEnum.describe("The standard unit of measurement"),
      originalText: z
        .string()
        .describe(
          "The raw text from the image for reference, e.g., '3 1/2 tbsp'",
        ),
    }),
  ),
  instructions: z
    .array(z.string())
    .describe("Step-by-step instructions to prepare the dish"),
});

// This line extracts the TypeScript type from the Zod schema
export type Recipe = z.infer<typeof RecipeSchema>;

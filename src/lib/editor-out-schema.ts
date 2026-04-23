// Postel's Law - "Be conservative in what you do, be liberal in what you accept from others."
// NOTE: Any changes in this file may require changes in the accompanying recipe-schema.ts file
// This schema strictly enforces the shape of data coming out of RHF.
// Numbers must be a valid number for the field or NULL
// Strings must be a valid string for the field or ""
// Arrays must not have any rows with only ""

import { z } from "zod";

const nullableFormNumber = (minVal: number, errorMsg?: string) =>
  z
    .literal("")
    .or(z.coerce.number().min(minVal, errorMsg))
    .transform((val) => (val === "" ? null : val));

export const editorOutSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  description: z.string().default(""),

  servings: nullableFormNumber(1, "Servings must be at least 1"),
  prepTime: nullableFormNumber(0, "Prep time cannot be negative"),
  cookTime: nullableFormNumber(0, "Cook time cannot be negative"),

  ingredients: z
    .array(
      z.object({
        name: z.string().default(""),
        quantity: nullableFormNumber(0, "Quantity cannot be negative"),
        unit: z.string().default(""),
      }),
    )
    .transform((ingredients) =>
      ingredients.filter((ing) => ing.name.trim() !== ""),
    )
    .default([]),

  instructions: z
    .array(z.string().default(""))
    .transform((steps) => steps.filter((step) => step.trim() !== ""))
    .default([]),
});

export type EditorOutSchema = z.infer<typeof editorOutSchema>;

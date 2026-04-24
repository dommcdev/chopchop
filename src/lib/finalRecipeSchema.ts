// Postel's Law - "Be conservative in what you do, be liberal in what you accept from others."
// NOTE: Any changes in this file may require changes in the other schema files
// This schema strictly enforces the shape of data coming out of RHF (& into our DB)
// Numbers must be a valid number for the field or null
// Strings must be a valid (trimmed) string for the field or ""
// Arrays must not have any rows with only ""

import { z } from "zod";

const nullableFormNumber = (minVal: number, errorMsg?: string) =>
  z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" ? null : Number(val)))
    .pipe(
      z
        .number({ message: "Must be a valid number" })
        .min(minVal, errorMsg)
        .nullable(),
    );

const nullableFormInt = (minVal: number, errorMsg?: string) =>
  z
    .union([z.string(), z.number()])
    .transform((val) => (val === "" ? null : Number(val)))
    .pipe(
      z
        .number({ message: "Must be a valid number" })
        .int(errorMsg ?? "Must be a whole number")
        .min(minVal, errorMsg)
        .nullable(),
    );

const customString = () =>
  z
    .string()
    .default("")
    .transform((v) => v.trim());

export const finalRecipeSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  description: customString(),

  servings: nullableFormNumber(1, "Servings must be at least 1"),
  prepTime: nullableFormNumber(0, "Prep time cannot be negative"),
  cookTime: nullableFormNumber(0, "Cook time cannot be negative"),

  categoryId: nullableFormInt(1, "Please select a category"),

  imageUrl: customString(),
  imageKey: customString(),

  ingredients: z
    .array(
      z.object({
        name: customString(),
        quantity: nullableFormNumber(0, "Quantity cannot be negative"),
        unit: customString(),
      }),
    )
    // STAGE 1: Silently remove rows where EVERYTHING is empty
    .transform((ings) =>
      ings.filter((ing) => {
        const hasName = ing.name.trim() !== "";
        const hasQuantity = ing.quantity !== null;
        const hasUnit = ing.unit.trim() !== "";
        return hasName || hasQuantity || hasUnit; // Keep if ANY field has data
      }),
    )
    // STAGE 2: Validate that remaining rows have a name
    .superRefine((ings, ctx) => {
      ings.forEach((ing, index) => {
        if (ing.name.trim() === "") {
          ctx.addIssue({
            code: "custom",
            message:
              "Ingredient name is required if quantity or unit is provided",
            path: [index, "name"],
          });
        }
      });
    })
    .default([]),

  instructions: z
    .array(z.object({ text: customString() }))
    .transform((steps) => steps.filter((item) => item.text !== "")) //remove whitespace-only steps
    .default([]),
});

export type EditorFormState = z.input<typeof finalRecipeSchema>;
export type FinalRecipeSchema = z.infer<typeof finalRecipeSchema>;

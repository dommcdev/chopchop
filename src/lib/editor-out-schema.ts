// Postel's Law - "Be conservative in what you do, be liberal in what you accept from others."
// NOTE: Any changes in this file may require changes in the other schema files
// This schema strictly enforces the shape of data coming out of RHF (& into our DB)
// Numbers must be a valid number for the field or null
// Strings must be a valid (trimmed) string for the field or ""
// Arrays must not have any rows with only ""

import { z } from "zod";

const nullableFormNumber = (minVal: number, errorMsg?: string) =>
  z
    .literal("")
    .or(z.coerce.number().min(minVal, errorMsg))
    .transform((val) => (val === "" ? null : val));

const customString = () =>
  z
    .string()
    .default("")
    .transform((v) => v.trim());

export const editorOutSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  description: customString(),

  servings: nullableFormNumber(1, "Servings must be at least 1"),
  prepTime: nullableFormNumber(0, "Prep time cannot be negative"),
  cookTime: nullableFormNumber(0, "Cook time cannot be negative"),

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
    .array(customString())
    .transform((steps) => steps.filter((step) => step !== "")) //remove whitespace-only steps
    .default([]),
});

export type EditorOutSchema = z.infer<typeof editorOutSchema>;

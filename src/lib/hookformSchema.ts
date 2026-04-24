// Postel's Law - "Be conservative in what you do, be liberal in what you accept from others."
// NOTE: Any changes in this file may require changes in the other schema files
// This schema guarantees that data going into RHF is either a string/number, or "". No form-crashing nulls or undefined

import { z } from "zod";

// Catch null/undefined and guarantee either a number or ""
const inboundNumber = z
  .number()
  .nullish()
  .transform((val) => val ?? "");

// Catch null/undefined and guarantee a safe (even if empty) string for react-hook-form
const inboundString = z
  .string()
  .nullish()
  .transform((val) => val ?? "");

export const hookformSchema = z.object({
  name: inboundString,
  description: inboundString,

  servings: inboundNumber,
  prepTime: inboundNumber,
  cookTime: inboundNumber,

  categoryId: inboundNumber,
  imageUrl: inboundString,
  imageKey: inboundString,

  ingredients: z
    .array(
      z.object({
        name: inboundString,
        quantity: inboundNumber,
        unit: inboundString,
      }),
    )
    .nullish()
    .transform((val) => val ?? []),

  instructions: z
    .array(z.object({ text: inboundString }))
    .nullish()
    .transform((val) => val ?? []),
});

export type HookformSchema = z.infer<typeof hookformSchema>;

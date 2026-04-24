/*
 * Takes in a client-validated single file, validates it again, and sends it to the Gemini API.
 * Returns a recipeSchema object.
 * Returns result objects rather than throwing Errors since Next.js masks thrown errors on client.
 */

"use server";

import { auth } from "@clerk/nextjs/server";
import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { geminiRecipeSchema, fileUploadSchema } from "@/lib/geminiRecipeSchema";
import { GEMINI_API_RETRIES } from "@/lib/constants";

export async function geminiAnalyzeRecipe(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    return { sucess: false, error: "Unauthorized" };
  }

  // Unlike .parse(), safeParse() returns a result object and never throws an error
  const validation = fileUploadSchema.safeParse(formData.get("recipeFile"));

  // Validate file again on the server
  if (!validation.success) {
    return { success: false, error: validation.error.issues[0].message }; //message from recipeSchema
  }
  const file = validation.data;

  const fileData = await file.arrayBuffer();
  const filePart =
    file.type === "application/pdf"
      ? {
          type: "file" as const,
          data: fileData,
          mediaType: file.type,
        }
      : {
          type: "image" as const,
          image: fileData,
          mediaType: file.type,
        };

  // Call Gemini API with some exponential backoff for when Google's servers are on fire
  let attempt = 0;
  while (attempt < GEMINI_API_RETRIES) {
    try {
      const { output } = await generateText({
        model: google("gemini-3-flash-preview"),
        output: Output.object({
          schema: geminiRecipeSchema,
        }),
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Please parse this recipe into structured JSON. Fix capitalization, spelling, and/or grammar errors if necessary.",
              },
              filePart,
            ],
          },
        ],
      });
      return { success: true, data: output }; // Return a structured object
    } catch (e) {
      attempt++;

      // Give up and send error to ui
      if (attempt >= 2) {
        return {
          success: false,
          error:
            "The AI service is currently busy or couldn't read the file. Please try again.",
        };
      }

      // Wait and then try again
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  // Fallback error (for TS)
  return {
    success: false,
    error: "Conversion failed after multiple attempts.",
  };
}

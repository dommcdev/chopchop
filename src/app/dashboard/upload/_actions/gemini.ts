"use server";

import { auth } from "@clerk/nextjs/server";
import { google } from "@ai-sdk/google";
import { generateText, Output } from "ai";
import { RecipeSchema, FileUploadSchema } from "@/lib/recipe-schema";

export async function analyzeRecipe(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const file = FileUploadSchema.parse(formData.get("image"));
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

  const { output } = await generateText({
    model: google("gemini-3-flash-preview"),
    output: Output.object({
      schema: RecipeSchema,
    }),
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Please parse this recipe into structured JSON.",
          },
          filePart,
        ],
      },
    ],
  });

  return output;
}

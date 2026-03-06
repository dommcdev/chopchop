"use server";

import { auth } from "@clerk/nextjs/server";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

export async function analyzeRecipe(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("image");
  if (!(file instanceof File)) {
    throw new Error("Invalid file upload");
  }

  const maxBytes = 5 * 1024 * 1024;
  if (file.size > maxBytes) {
    throw new Error("File too large (max 5MB)");
  }

  const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
  if (!allowedMimeTypes.has(file.type)) {
    throw new Error("Unsupported image type");
  }

  const result = await generateObject({
    model: google("gemini-3-flash-preview"),
    schema: z.object({
      recipeName: z.string(),
      ingredients: z.array(z.string()),
    }),
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "Please parse this recipe." },
          {
            type: "image",
            image: await file.arrayBuffer(),
          },
        ],
      },
    ],
  });

  return result.object;
}

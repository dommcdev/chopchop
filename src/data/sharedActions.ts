"use server";

import { ExportRecipesResult } from "@/types";
import { fetchRecipesExportData } from "./shared";

export async function exportRecipes(): Promise<ExportRecipesResult> {
  try {
    const exportData = await fetchRecipesExportData();

    return {
      success: true,
      fileName: "recipes.json",
      json: JSON.stringify(exportData, null, 2),
    };
  } catch (error) {
    console.error("Failed to export recipes:", error);

    return {
      success: false,
      error: "Failed to export recipes.",
    };
  }
}

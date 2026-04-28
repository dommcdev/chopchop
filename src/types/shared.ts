import { RecipeEditorInitialValues } from "@/lib/hookformSchema";

export type ExportRecipe = Omit<
  RecipeEditorInitialValues,
  "categoryId" | "imageUrl" | "imageKey"
> & {
  category: string;
};

export type RecipesExportData = ExportRecipe[];

export type ExportRecipesResult =
  | { success: true; fileName: string; json: string }
  | { success: false; error: string };

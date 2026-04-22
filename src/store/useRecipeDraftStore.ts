import { create } from "zustand";
import { RecipeSchema } from "@/lib/recipe-schema";

interface RecipeUploadState {
  analyzedData: RecipeSchema | null;
  isAnalyzing: boolean;

  // Actions
  setAnalyzedData: (data: RecipeSchema) => void;
  setAnalyzing: (loading: boolean) => void;
  clearStore: () => void;
}

export const useRecipeUploadStore = create<RecipeUploadState>((set) => ({
  analyzedData: null,
  isAnalyzing: false,

  setAnalyzedData: (data) => set({ analyzedData: data }),
  setAnalyzing: (loading) => set({ isAnalyzing: loading }),
  clearStore: () => set({ analyzedData: null, isAnalyzing: false }),
}));

import { create } from "zustand";
import { GeminiRecipeSchema } from "@/lib/geminiRecipeSchema";

interface RecipeUploadState {
  analyzedData: GeminiRecipeSchema | null;
  isAnalyzing: boolean;

  // Actions
  setAnalyzedData: (data: GeminiRecipeSchema) => void;
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

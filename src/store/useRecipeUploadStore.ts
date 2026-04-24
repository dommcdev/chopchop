import { create } from "zustand";
import { RecipeEditorInitialValues } from "@/lib/hookformSchema";

interface RecipeUploadState {
  draft: RecipeEditorInitialValues | null;
  isAnalyzing: boolean;

  // Actions
  setDraft: (data: RecipeEditorInitialValues) => void;
  setAnalyzing: (loading: boolean) => void;
  clearStore: () => void;
}

export const useRecipeUploadStore = create<RecipeUploadState>((set) => ({
  draft: null,
  isAnalyzing: false,

  setDraft: (data) => set({ draft: data }),
  setAnalyzing: (loading) => set({ isAnalyzing: loading }),
  clearStore: () => set({ draft: null, isAnalyzing: false }),
}));

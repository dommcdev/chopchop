"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { UploadSimpleIcon } from "@phosphor-icons/react";
import { geminiAnalyzeRecipe } from "../_actions/geminiAnalyzeRecipe";
import { fileUploadSchema } from "@/lib/recipe-schema";
import { useRecipeUploadStore } from "@/store/useRecipeUploadStore";
import { toast } from "sonner";

export function UploadRecipeButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Grab actions from my store
  const setAnalyzedData = useRecipeUploadStore(
    (state) => state.setAnalyzedData,
  );
  const isAnalyzing = useRecipeUploadStore((state) => state.isAnalyzing);
  const setAnalyzing = useRecipeUploadStore((state) => state.setAnalyzing);

  // triggered when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // triggered when the user selects a file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target; //`files` is now the FileList object

    // If no files (user closed picker)
    if (!files?.length) return;

    try {
      // Too many files
      if (files.length > 1) {
        throw new Error("Please upload only one recipe at a time.");
      }

      // Wrong type of file
      const file = files[0];
      const validation = fileUploadSchema.safeParse(file);
      if (!validation.success) {
        // Throw the specific error message from Zod
        throw new Error(validation.error.issues[0].message);
      }

      // Happy path
      setAnalyzing(true); //global 'Gemini is processing' state
      const formData = new FormData();
      formData.append("recipeFile", file);

      // Call API with file
      const result = await geminiAnalyzeRecipe(formData);

      // Handle result objects from server
      if (!result.success) {
        throw new Error(result.error);
      }

      // Put data from server in our store
      if (result.data) {
        setAnalyzedData(result.data);
        console.log("Success!");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(message);
      toast(message);
    } finally {
      // Cleanup
      setAnalyzing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="px-3 sm:px-4 w-fit items-center gap-2 rounded-none shadow-sm"
        onClick={handleButtonClick}
        disabled={isAnalyzing}
        aria-label="Upload Recipe"
      >
        <UploadSimpleIcon
          className={`h-4 w-4 shrink-0 ${isAnalyzing ? "animate-pulse" : ""}`}
          weight="bold"
        />

        <span className="hidden md:inline-block text-sm font-medium">
          {isAnalyzing ? "Scanning..." : "Upload Recipe"}
        </span>
      </Button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,application/pdf"
        className="hidden"
      />
    </>
  );
}

// TODO Add ui error dialogs where console.errors currently are

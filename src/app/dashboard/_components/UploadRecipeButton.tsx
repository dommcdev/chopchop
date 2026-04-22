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
      // Any errors thrown before this point will be handled in the catch block.
      // Any ones thrown after this point will be handled by toast.promise().error
      const uploadPromise = async () => {
        setAnalyzing(true); //global 'Gemini is processing' state
        const formData = new FormData();
        formData.append("recipeFile", file);

        // Call API with file
        const result = await geminiAnalyzeRecipe(formData);

        // Handle result objects from server
        if (!result.success || !result.data) {
          throw new Error(result.error || "Failed to parse recipe data.");
        }

        // Put data from server in our store
        setAnalyzedData(result.data);
        return result.data;
      };

      // Trigger the loading toast
      toast.promise(uploadPromise(), {
        loading: "Parsing recipe...",
        success: (data) => `Success! Parsed "${data.name}"`,
        error: (err) => err.message,
        finally: () => {
          setAnalyzing(false);
        },
        position: "top-center",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(message, { position: "top-center" });
    } finally {
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
        <UploadSimpleIcon className={"h-4 w-4 shrink-0"} weight="bold" />

        <span className="hidden md:inline-block text-sm font-medium">
          Upload Recipe
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

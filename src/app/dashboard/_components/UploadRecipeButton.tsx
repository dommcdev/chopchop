"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { UploadSimpleIcon } from "@phosphor-icons/react";
import { geminiAnalyzeRecipe } from "../_actions/geminiAnalyzeRecipe";

export function UploadRecipeButton() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  // triggered when the button is clicked
  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  // triggered when the user selects a file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("recipeFile", file);

      const result = await geminiAnalyzeRecipe(formData);
      console.log("Gemini Results:", result);
      // Send data to editor here
      console.log("Formatted Output:", JSON.stringify(result, null, 2));
    } catch (error) {
      console.error("Scanning failed:", error);
      // TODO Use `error` in ui dialog here
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <Button
        variant="outline"
        className="px-3 sm:px-4 w-fit items-center gap-2 rounded-none shadow-sm"
        onClick={handleButtonClick}
        disabled={isUploading}
        aria-label="Upload Recipe"
      >
        <UploadSimpleIcon
          className={`h-4 w-4 shrink-0 ${isUploading ? "animate-pulse" : ""}`}
          weight="bold"
        />

        <span className="hidden md:inline-block text-sm font-medium">
          {isUploading ? "Scanning..." : "Upload Recipe"}
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

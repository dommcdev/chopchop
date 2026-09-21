"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { geminiAnalyzeRecipe } from "@/actions/geminiAnalyzeRecipe";
import { fileUploadSchema } from "@/lib/geminiRecipeSchema";
import { geminiToRecipeEditorInitialValues } from "@/lib/recipeEditorMappers";
import { useRecipeUploadStore } from "@/store/useRecipeUploadStore";

/**
 * Drives the "upload a photo/PDF, let Gemini parse it" flow.
 *
 * Render `<input {...fileInputProps} />` somewhere and call `openFilePicker()`
 * from any button. `onFileAccepted` fires once a file passes validation and
 * parsing has started, which is a good moment to close a dialog.
 */
export function useRecipeUpload({
  onFileAccepted,
}: { onFileAccepted?: () => void } = {}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const setDraft = useRecipeUploadStore((state) => state.setDraft);
  const isAnalyzing = useRecipeUploadStore((state) => state.isAnalyzing);
  const setAnalyzing = useRecipeUploadStore((state) => state.setAnalyzing);
  const router = useRouter();

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    // If no files (user closed picker)
    if (!files?.length) return;

    try {
      if (files.length > 1) {
        throw new Error("Please upload only one recipe at a time.");
      }

      const file = files[0];
      const validation = fileUploadSchema.safeParse(file);
      if (!validation.success) {
        throw new Error(validation.error.issues[0].message);
      }

      onFileAccepted?.();

      // Any errors thrown before this point are handled in the catch block.
      // Any thrown after are handled by toast.promise().error
      const uploadPromise = async () => {
        setAnalyzing(true); //global 'Gemini is processing' state
        const formData = new FormData();
        formData.append("recipeFile", file);

        const result = await geminiAnalyzeRecipe(formData);

        if (!result.success) {
          throw new Error(result.error);
        }

        setDraft(geminiToRecipeEditorInitialValues(result.data));
        router.push(`/dashboard/r/new`);
        return result.data;
      };

      toast.promise(uploadPromise(), {
        loading: "Parsing recipe...",
        success: (data) => `Success! Parsed "${data.name}"`,
        error: (err) => err.message,
        finally: () => {
          setAnalyzing(false);
        },
        position: "bottom-right",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      toast.error(message);
      console.error(message);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const fileInputProps = {
    ref: fileInputRef,
    type: "file",
    onChange: handleFileChange,
    accept: "image/*,application/pdf",
    className: "hidden",
  } satisfies React.ComponentProps<"input">;

  return { openFilePicker, isAnalyzing, fileInputProps };
}

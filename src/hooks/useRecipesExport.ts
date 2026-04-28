"use client";

import { useState } from "react";
import { toast } from "sonner";
import { exportRecipes } from "@/data/sharedActions";

function downloadJsonFile(fileName: string, json: string) {
  const url = URL.createObjectURL(
    new Blob([json], { type: "application/json" }),
  );
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  link.click();

  URL.revokeObjectURL(url);
}

export function useRecipesExport() {
  const [isExporting, setIsExporting] = useState(false);

  const runExport = () => {
    if (isExporting) {
      return;
    }

    const exportPromise = async () => {
      setIsExporting(true);

      const result = await exportRecipes();

      if (!result.success) {
        throw new Error(result.error);
      }

      downloadJsonFile(result.fileName, result.json);
      return result;
    };

    toast.promise(exportPromise(), {
      loading: "Exporting recipes...",
      success: (result) => `Exported ${result.fileName}`,
      error: (err) => err.message,
      finally: () => {
        setIsExporting(false);
      },
      position: "bottom-right",
    });
  };

  return { runExport, isExporting };
}

"use client";

import { Button } from "@/components/ui/button";
import { UploadSimpleIcon } from "@phosphor-icons/react";
import { useRecipeUpload } from "@/hooks/useRecipeUpload";
import { cn } from "@/lib/utils";

type UploadRecipeButtonProps = {
  variant?: React.ComponentProps<typeof Button>["variant"];
  className?: string;
  /** Show the text label at every width, not just from `md` up. */
  alwaysShowLabel?: boolean;
};

export function UploadRecipeButton({
  variant = "outline",
  className,
  alwaysShowLabel = false,
}: UploadRecipeButtonProps = {}) {
  const { openFilePicker, isAnalyzing, fileInputProps } = useRecipeUpload();

  return (
    <>
      <Button
        variant={variant}
        className={cn(
          "px-3 sm:px-4 w-fit items-center gap-2 rounded-none shadow-sm",
          className,
        )}
        onClick={openFilePicker}
        disabled={isAnalyzing}
        aria-label="Upload Recipe"
      >
        <UploadSimpleIcon className={"h-4 w-4 shrink-0"} weight="bold" />

        <span
          className={cn(
            "text-sm font-medium",
            alwaysShowLabel ? "inline-block" : "hidden md:inline-block",
          )}
        >
          Upload Recipe
        </span>
      </Button>

      <input {...fileInputProps} />
    </>
  );
}

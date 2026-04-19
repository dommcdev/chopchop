"use client";

import { Button } from "@/components/ui/button";
import { UploadSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { analyzeRecipe } from "../upload/_actions/gemini";

export function UploadRecipeButton() {
  return (
    <Button variant="outline" size="sm">
      <UploadSimpleIcon /> Upload Recipe
    </Button>
  );
}

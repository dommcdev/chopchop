"use client";

import { use } from "react";
import { RecipeEditor } from "@/components/RecipeEditor";
import { useRouter } from "next/navigation";
import { EditorOutSchema } from "@/lib/editor-out-schema";
import { RecipeBlob } from "@/types";
import { toast } from "sonner";

interface EditRecipeClientProps {
  recipePromise: Promise<RecipeBlob | undefined>;
}

export function EditRecipeClient({ recipePromise }: EditRecipeClientProps) {
  const router = useRouter();
  const initialData = use(recipePromise);

  if (!initialData) {
    return <p>Oops! That recipe doesn't seem to exist.</p>; //TODO render our error/404 screen here
  }

  const handleSave = async (finalData: EditorOutSchema) => {
    try {
      // update db
      toast("You submitted the following values (from parent):", {
        description: <code>{JSON.stringify(finalData, null, 2)}</code>,
      });
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
    }
  };

  return <RecipeEditor recipeData={initialData} handleSave={handleSave} />;
}

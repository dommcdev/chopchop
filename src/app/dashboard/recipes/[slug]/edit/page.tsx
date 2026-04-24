import { EditRecipeClient } from "@/components/EditRecipeClient";
import { fetchRecipeBlob } from "@/data/recipes";
import { Suspense } from "react";

export default async function RecipeEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipePromise = fetchRecipeBlob(slug);

  return (
    <Suspense fallback={<p>Loading recipe data...</p>}>
      <EditRecipeClient recipePromise={recipePromise} />
    </Suspense>
  );
}

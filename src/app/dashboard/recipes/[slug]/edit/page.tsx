import { EditRecipeClient } from "@/components/EditRecipeClient";
import { fetchCategories } from "@/data/categories";
import { fetchRecipeBlob } from "@/data/recipes";
import { Suspense } from "react";

export default async function RecipeEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipePromise = fetchRecipeBlob(slug);
  const categoriesPromise = fetchCategories();

  return (
    <Suspense fallback={<p>Loading recipe data...</p>}>
      <EditRecipeClient
        recipePromise={recipePromise}
        categoriesPromise={categoriesPromise}
      />
    </Suspense>
  );
}

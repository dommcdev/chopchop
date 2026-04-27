import { BackLink } from "@/components/dashboard/BackLink";
import { EditRecipeClient } from "@/components/EditRecipeClient";
import { fetchCategories } from "@/data/categories";
import { fetchRecipeDetailsBySlug } from "@/data/recipes";
import { Suspense } from "react";

export default async function RecipeEditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipePromise = fetchRecipeDetailsBySlug(slug);
  const categoriesPromise = fetchCategories();

  return (
    <>
      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8">
        <div className="mb-5">
          <BackLink href="/dashboard">Back to Dashboard</BackLink>
        </div>
        <Suspense fallback={<p>Loading recipe data...</p>}>
          <EditRecipeClient
            recipePromise={recipePromise}
            categoriesPromise={categoriesPromise}
          />
        </Suspense>
      </div>
    </>
  );
}

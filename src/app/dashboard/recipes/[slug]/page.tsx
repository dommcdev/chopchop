import { BackLink } from "@/components/dashboard/BackLink";
import { RecipeViewer, RecipeViewerSkeleton } from "@/components/RecipeViewer";
import { fetchRecipeDetailsBySlug } from "@/data/recipes";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipePromise = fetchRecipeDetailsBySlug(slug);

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8">
      <div className="print:hidden mb-5">
        <BackLink href="/dashboard">Back to Dashboard</BackLink>
      </div>

      <Suspense fallback={<RecipeViewerSkeleton />}>
        <RecipeViewerContent recipePromise={recipePromise} />
      </Suspense>
    </div>
  );
}

async function RecipeViewerContent({
  recipePromise,
}: {
  recipePromise: ReturnType<typeof fetchRecipeDetailsBySlug>;
}) {
  const recipe = await recipePromise;

  if (!recipe) {
    notFound();
  }

  return <RecipeViewer recipe={recipe} canEdit />;
}

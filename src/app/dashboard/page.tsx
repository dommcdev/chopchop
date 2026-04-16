import BrowseCategories from "@/app/dashboard/_components/BrowseCategories";
import BrowseRecipes from "@/app/dashboard/_components/BrowseRecipes";
import { fetchRecipesBlock } from "@/data/recipes";
import { Suspense } from "react";
import { BrowseRecipesSkeleton } from "@/app/dashboard/_components/BrowseRecipesSkeleton";

const INITIAL_RECIPE_BATCH_SIZE = 20;

export default async function DashboardPage() {
  return (
    <main className="mx-auto max-w-screen-2xl p-3">
      <BrowseCategories />
      <Suspense
        fallback={<BrowseRecipesSkeleton count={INITIAL_RECIPE_BATCH_SIZE} />}
      >
        <BrowseRecipesSection />
      </Suspense>
    </main>
  );
}

async function BrowseRecipesSection() {
  const initialRecipes = await fetchRecipesBlock(INITIAL_RECIPE_BATCH_SIZE, 0);

  return (
    <BrowseRecipes
      initialItems={initialRecipes}
      initialBatchSize={INITIAL_RECIPE_BATCH_SIZE}
    />
  );
}

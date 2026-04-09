import BrowseCategories from "@/app/dashboard/_components/BrowseCategories";
import BrowseRecipes from "@/app/dashboard/_components/BrowseRecipes";
import { fetchRecipesBlock } from "@/data/recipes";

const INITIAL_RECIPE_BATCH_SIZE = 20;

export default async function DashboardPage() {
  const initialRecipes = await fetchRecipesBlock(INITIAL_RECIPE_BATCH_SIZE, 0);

  return (
    <main className="mx-auto max-w-screen-2xl p-3">
      <div className="flex flex-col gap-6">
        <BrowseCategories />
      </div>

      <BrowseRecipes
        initialItems={initialRecipes}
        initialBatchSize={INITIAL_RECIPE_BATCH_SIZE}
      />
    </main>
  );
}

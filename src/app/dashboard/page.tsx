import BrowseCategories from "@/app/dashboard/_components/BrowseCategories";
import BrowseRecipes from "@/app/dashboard/_components/BrowseRecipes";
import { fetchRecipesBlock } from "@/data/recipes";

export default async function DashboardPage() {
  const initialRecipes = await fetchRecipesBlock(12, 0);

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <BrowseCategories />
      </div>

      <BrowseRecipes initialItems={initialRecipes} />
    </main>
  );
}

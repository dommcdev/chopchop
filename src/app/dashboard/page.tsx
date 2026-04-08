import BrowseCategories from "@/app/dashboard/_components/BrowseCategories";
import { FillDatabaseButton } from "@/app/dashboard/_components/FillDatabaseButton";
import InfiniteScroll from "@/app/dashboard/_components/InfiniteScroll";
import RecipeCard from "@/app/dashboard/_components/RecipeCard";
import { getRecipes } from "@/data/recipes";

export default async function DashboardPage() {
  const initialRecipes = await getRecipes(12, 0);

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <BrowseCategories />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        <InfiniteScroll />
      </div>
    </main>
  );
}

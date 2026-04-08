import BrowseCategories from "@/app/dashboard/_components/BrowseCategories";
import { FillDatabaseButton } from "@/app/dashboard/_components/FillDatabaseButton";
import RecipeCard from "@/app/dashboard/_components/RecipeCard";
import { fetchRecipesBlock } from "@/data/recipes";
import BrowseRecipes from "@/app/dashboard/_components/BrowseRecipes";

export default async function DashboardPage() {
  const initialRecipes = await fetchRecipesBlock(12, 0);

  return (
    <main className="p-3 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <BrowseCategories />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {initialRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
        <BrowseRecipes />
      </div>
    </main>
  );
}

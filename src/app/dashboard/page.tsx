import BrowseCategories from "@/app/dashboard/_components/BrowseCategories";
import { FillDatabaseButton } from "@/app/dashboard/_components/FillDatabaseButton";
import InfiniteScroll from "@/app/dashboard/_components/InfiniteScroll";
import RecipeCard from "@/app/dashboard/_components/RecipeCard";
import { db } from "@/db";
import { recipes } from "@/db/schema";

export default async function DashboardPage() {
  const initialRecipes = await db.select().from(recipes).limit(6);

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex justify-end">
          <FillDatabaseButton />
        </div>
        <BrowseCategories />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render the first batch immediately (Fast & SEO friendly) */}
        {initialRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}

        {/* This component handles all the automatic loading from now on */}
        <InfiniteScroll />
      </div>
    </main>
  );
}

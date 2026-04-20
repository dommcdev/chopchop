//Displays the most recent 20 recipes in a grid. Intended for use on dashboard page only

import RecipesGrid, { RecipesGridSkeleton } from "./RecipesGrid";
import { Suspense } from "react";
import { fetchRecipesBlock } from "@/data/recipes";
import Link from "next/link";
import { RECIPES_PAGE_SIZE } from "@/lib/constants";

export default async function RecentDashboardRecipes() {
  const recipesPromise = fetchRecipesBlock(RECIPES_PAGE_SIZE, 0);
  return (
    <>
      <section className="m-4 flex flex-col gap-2 md:m-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">Recent Recipes</h2>
          <Link href="/dashboard/r" className="underline">
            View all recipes
          </Link>
        </div>
        <Suspense
          fallback={<RecipesGridSkeleton pageSize={RECIPES_PAGE_SIZE} />}
        >
          <RecipesGrid recipesPromise={recipesPromise} />
        </Suspense>
      </section>
    </>
  );
}

import { Suspense } from "react";
import { fetchRecipesBlock } from "@/data/recipes";
import Link from "next/link";
import { RECIPES_PAGE_SIZE } from "@/lib/constants";
import ResponsiveGrid from "./ResponsiveGrid";
import { RecipeCardCreate, RecipeCardSkeleton } from "./RecipeCard";
import RecipesList from "./RecipesList";

export default async function DashboardRecipes() {
  const recipesPromise = fetchRecipesBlock(RECIPES_PAGE_SIZE, 0);
  return (
    <>
      <section className="m-4 flex flex-col gap-2 md:m-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold tracking-tight">
            Recent Recipes
          </h2>
          <Link
            href="/dashboard/r"
            className="text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
          >
            View all recipes
          </Link>
        </div>

        <Suspense
          fallback={
            <ResponsiveGrid>
              <Link
                href="/dashboard/r/new"
                className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <RecipeCardCreate />
              </Link>
              {Array.from({ length: RECIPES_PAGE_SIZE }).map((_, index) => (
                <RecipeCardSkeleton key={index} />
              ))}
            </ResponsiveGrid>
          }
        >
          <ResponsiveGrid>
            <Link
              href="/dashboard/r/new"
              className="block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <RecipeCardCreate />
            </Link>
            <RecipesList recipesPromise={recipesPromise} />
          </ResponsiveGrid>
        </Suspense>
      </section>
    </>
  );
}

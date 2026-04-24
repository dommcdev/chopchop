import { Suspense } from "react";
import { BackLink } from "@/components/dashboard/BackLink";
import { PaginationBar } from "@/components/PaginationBar";
import { fetchRecipesBlock, getNumOfPages } from "@/data/recipes";
import { RECIPES_PAGE_SIZE } from "@/lib/constants";
import ResponsiveGrid from "@/components/dashboard/ResponsiveGrid";
import { RecipeCardSkeleton } from "@/components/dashboard/RecipeCard";
import RecipesList from "@/components/dashboard/RecipesList";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: p } = await searchParams;
  const page = Number(p) || 1;

  const recipesPromise = fetchRecipesBlock(
    RECIPES_PAGE_SIZE,
    (page - 1) * RECIPES_PAGE_SIZE,
  );
  const totalPagesPromise = getNumOfPages(RECIPES_PAGE_SIZE);

  return (
    <main className="mx-auto max-w-screen-3xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col items-start gap-2.5 md:mb-10">
        <BackLink href="/dashboard">Back to Dashboard</BackLink>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          All Recipes
        </h1>
      </div>

      <Suspense
        key={page}
        fallback={
          <ResponsiveGrid>
            {Array.from({ length: RECIPES_PAGE_SIZE }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </ResponsiveGrid>
        }
      >
        <ResponsiveGrid>
          <RecipesList recipesPromise={recipesPromise} />
        </ResponsiveGrid>
      </Suspense>

      <div className="mt-8 md:mt-10">
        <PaginationBar
          currentPage={page}
          totalPagesPromise={totalPagesPromise}
        />
      </div>
    </main>
  );
}

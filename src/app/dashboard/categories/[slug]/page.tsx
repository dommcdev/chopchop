import { Suspense } from "react";
import { BackLink } from "@/components/dashboard/BackLink";
import { PaginationBar } from "@/components/PaginationBar";
import {
  fetchRecipesByCategoryBlock,
  fetchNumOfPagesByCategory,
} from "@/data/recipes";
import { fetchCategoryNameFromSlug } from "@/data/categories";
import { RECIPES_PAGE_SIZE } from "@/lib/constants";
import ResponsiveGrid from "@/components/dashboard/ResponsiveGrid";
import { RecipeCardSkeleton } from "@/components/dashboard/RecipeCard";
import RecipesList from "@/components/dashboard/RecipesList";
import { notFound } from "next/navigation";

export default function RecipesByCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  return (
    <main className="mx-auto max-w-screen-3xl p-4 sm:p-6 lg:p-8">
      <div className="mb-4 border-b border-border/60 pb-5 sm:pb-6">
        <BackLink href="/dashboard" className="mb-3">
          Back to Dashboard
        </BackLink>
        <Suspense
          fallback={
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Category Recipes
            </h1>
          }
        >
          <CategoryTitle params={params} />
        </Suspense>
      </div>

      <Suspense
        fallback={
          <ResponsiveGrid>
            {Array.from({ length: RECIPES_PAGE_SIZE }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </ResponsiveGrid>
        }
      >
        <RecipesSection params={params} searchParams={searchParams} />
      </Suspense>
    </main>
  );
}

async function CategoryTitle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categoryName = await fetchCategoryNameFromSlug(slug);

  if (!categoryName) {
    notFound();
  }

  return (
    <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
      {categoryName}
    </h1>
  );
}

async function RecipesSection({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const [{ slug }, { page: p }] = await Promise.all([params, searchParams]);
  const page = Number(p) || 1;
  const recipesPromise = fetchRecipesByCategoryBlock(
    slug,
    RECIPES_PAGE_SIZE,
    (page - 1) * RECIPES_PAGE_SIZE,
  );
  const totalPagesPromise = fetchNumOfPagesByCategory(slug, RECIPES_PAGE_SIZE);

  return (
    <>
      <ResponsiveGrid>
        <RecipesList recipesPromise={recipesPromise} />
      </ResponsiveGrid>

      <div className="mt-8 md:mt-10">
        <PaginationBar
          currentPage={page}
          totalPagesPromise={totalPagesPromise}
        />
      </div>
    </>
  );
}

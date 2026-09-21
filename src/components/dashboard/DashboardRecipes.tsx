import { Suspense } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";
import { fetchCategories } from "@/data/categories";
import {
  fetchRecipeCount,
  fetchRecipeCountByCategory,
  fetchRecipesBlock,
  fetchRecipesByCategoryBlock,
} from "@/data/recipes";
import { RECIPES_PAGE_SIZE } from "@/lib/constants";
import { CategoryTabs, CategoryTabsSkeleton } from "./CategoryTabs";
import { RecipeCardSkeleton } from "./RecipeCard";
import { RecipesEmptyState } from "./RecipesEmptyState";
import RecipesList from "./RecipesList";
import ResponsiveGrid from "./ResponsiveGrid";

type SearchParams = Promise<{ c?: string }>;

export default function DashboardRecipes({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="sr-only">Recipes</h1>

      <Suspense fallback={<CategoryTabsSkeleton />}>
        <CategoryTabs searchParams={searchParams} />
      </Suspense>

      <Suspense
        fallback={
          <ResponsiveGrid>
            {Array.from({ length: RECIPES_PAGE_SIZE }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </ResponsiveGrid>
        }
      >
        <FilteredRecipes searchParams={searchParams} />
      </Suspense>
    </section>
  );
}

async function FilteredRecipes({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const [{ c }, categories] = await Promise.all([
    searchParams,
    fetchCategories(),
  ]);
  const activeCategory = categories.find((cat) => cat.slug === c);

  if (!activeCategory) {
    return (
      <>
        <RecipesList recipesPromise={fetchRecipesBlock(RECIPES_PAGE_SIZE, 0)} />
        <ViewAllLink
          href="/dashboard/r"
          totalPromise={fetchRecipeCount()}
          label="recipes"
        />
      </>
    );
  }

  return (
    <>
      <RecipesList
        recipesPromise={fetchRecipesByCategoryBlock(
          activeCategory.slug,
          RECIPES_PAGE_SIZE,
          0,
        )}
        emptyState={
          <RecipesEmptyState
            title={`Nothing in ${activeCategory.name} yet`}
            description={`Upload a recipe or start one from scratch, then file it under ${activeCategory.name} from the editor.`}
          />
        }
      />
      <ViewAllLink
        href={`/dashboard/c/${activeCategory.slug}`}
        totalPromise={fetchRecipeCountByCategory(activeCategory.slug)}
        label={`in ${activeCategory.name}`}
      />
    </>
  );
}

/** Shown only when there are more recipes than the dashboard displays. */
async function ViewAllLink({
  href,
  totalPromise,
  label,
}: {
  href: string;
  totalPromise: Promise<number>;
  label: string;
}) {
  const total = await totalPromise;

  if (total <= RECIPES_PAGE_SIZE) return null;

  return (
    <div className="flex justify-end pt-2">
      <Link
        href={href}
        className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        View all {total} {label}
        <ArrowRightIcon
          weight="bold"
          className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}

import { Suspense } from "react";
import { fetchRecipesBlock } from "@/data/recipes";
import Link from "next/link";
import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { RECIPES_PAGE_SIZE } from "@/lib/constants";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ResponsiveGrid from "./ResponsiveGrid";
import { RecipeCardSkeleton } from "./RecipeCard";
import RecipesList from "./RecipesList";
import { SectionHeader } from "./SectionHeader";

export default async function DashboardRecipes() {
  const recipesPromise = fetchRecipesBlock(RECIPES_PAGE_SIZE, 0);
  return (
    <section className="my-4 flex flex-col gap-2 md:my-6">
      <SectionHeader
        title="Recent Recipes"
        viewAllHref="/dashboard/r"
        viewAllLabel="View all"
        action={
          <Link
            href="/dashboard/r/new"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "gap-1.5 px-3 text-sm font-medium shadow-sm",
            )}
          >
            <PlusIcon weight="bold" className="size-4" aria-hidden="true" />
            New recipe
          </Link>
        }
      />

      <Suspense
        fallback={
          <ResponsiveGrid>
            {Array.from({ length: RECIPES_PAGE_SIZE }).map((_, index) => (
              <RecipeCardSkeleton key={index} />
            ))}
          </ResponsiveGrid>
        }
      >
        <RecipesList recipesPromise={recipesPromise} />
      </Suspense>
    </section>
  );
}

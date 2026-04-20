import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import RecipesGrid, { RecipesGridSkeleton } from "../_components/RecipesGrid";
import { PaginationBar } from "./_components/PaginationBar";
import { fetchRecipesBlock, getNumOfPages } from "@/data/recipes";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: p } = await searchParams; //since searchParams are now asynchronous
  const page = Number(p) || 1;
  const PAGE_SIZE = 27; //can change if needed

  //Begin parallel data fetching for page count and recipes
  const recipesPromise = fetchRecipesBlock(PAGE_SIZE, (page - 1) * PAGE_SIZE);
  const totalPagesPromise = getNumOfPages(PAGE_SIZE);

  return (
    <main className="mx-auto max-w-screen-3xl p-4 sm:p-6 lg:p-8">
      <div className="mb-8 flex flex-col items-start gap-2.5 md:mb-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon weight="bold" className="h-4 w-4 shrink-0" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          All Recipes
        </h1>
      </div>

      <Suspense
        key={page}
        fallback={<RecipesGridSkeleton pageSize={PAGE_SIZE} />}
      >
        <RecipesGrid recipesPromise={recipesPromise} />
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

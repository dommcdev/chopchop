import { Suspense } from "react";
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
  const PAGE_SIZE = 20; //can change if needed

  //Begin parallel data fetching for page count and recipes
  const recipesPromise = fetchRecipesBlock(PAGE_SIZE, (page - 1) * PAGE_SIZE);
  const totalPagesPromise = getNumOfPages(PAGE_SIZE);

  return (
    <>
      <main className="mx-auto max-w-screen-3xl p-4 flex flex-col gap-2 md:p-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">All Recipes</h2>
        </div>
        <Suspense
          key={page}
          fallback={<RecipesGridSkeleton pageSize={PAGE_SIZE} />}
        >
          <RecipesGrid recipesPromise={recipesPromise} />
        </Suspense>
        <PaginationBar
          currentPage={page}
          totalPagesPromise={totalPagesPromise}
        />
      </main>
    </>
  );
}

import { Suspense } from "react";
import RecipesGrid, { RecipesGridSkeleton } from "../_components/RecipesGrid";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const pageSize = 20; //can change if needed

  return (
    <>
      <section className="m-4 flex flex-col gap-2 md:m-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">All Recipes</h2>
        </div>
        <Suspense
          key={page}
          fallback={<RecipesGridSkeleton pageSize={pageSize} />}
        />
        <RecipesGrid page={page} pageSize={pageSize} />
        <Suspense />
        {/* Pagination bar here*/}
      </section>
    </>
  );
}

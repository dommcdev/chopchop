import RecipesGrid, { RecipesGridSkeleton } from "./RecipesGrid";
import { Suspense } from "react";

export default async function RecentRecipes({
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
          <h2 className="text-xl font-bold">Recent Recipes</h2>
        </div>
        <Suspense
          key={page}
          fallback={<RecipesGridSkeleton pageSize={pageSize} />}
        />
        <RecipesGrid page={page} pageSize={pageSize} />
        <Suspense />
      </section>
    </>
  );
}

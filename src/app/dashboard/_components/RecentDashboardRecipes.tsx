//Displays the most recent 20 recipes in a grid. Intended for use on
//dashboard page only

import RecipesGrid, { RecipesGridSkeleton } from "./RecipesGrid";
import { Suspense } from "react";

export default async function RecentDashboardRecipes() {
  const pageSize = 20; //can change if needed
  return (
    <>
      <section className="m-4 flex flex-col gap-2 md:m-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">Recent Recipes</h2>
        </div>
        <Suspense fallback={<RecipesGridSkeleton pageSize={pageSize} />}>
          <RecipesGrid page={1} pageSize={pageSize} />
        </Suspense>
      </section>
    </>
  );
}

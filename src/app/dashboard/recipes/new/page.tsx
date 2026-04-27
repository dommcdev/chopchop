import { fetchCategories } from "@/data/categories";
import { NewRecipeClient } from "./NewRecipeClient";
import { BackLink } from "@/components/dashboard/BackLink";
import { Suspense } from "react";

export default async function NewRecipePage() {
  const categoriesPromise = fetchCategories();
  return (
    <>
      <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8">
        <div className="mb-5">
          <BackLink href="/dashboard">Back to Dashboard</BackLink>
        </div>
        <Suspense fallback={<p>Loading recipe data...</p>}>
          <NewRecipeClient categoriesPromise={categoriesPromise} />
        </Suspense>
      </div>
    </>
  );
}

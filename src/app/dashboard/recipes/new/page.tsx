import { fetchCategories } from "@/data/categories";
import { RecipeEditorSkeleton } from "@/components/RecipeEditor";
import { NewRecipeClient } from "./NewRecipeClient";
import { BackLink } from "@/components/dashboard/BackLink";
import { Suspense } from "react";

export default async function NewRecipePage() {
  const categoriesPromise = fetchCategories();
  return (
    <>
      <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">
        <div className="mb-5">
          <BackLink href="/dashboard">Back to Dashboard</BackLink>
        </div>
        <Suspense fallback={<RecipeEditorSkeleton />}>
          <NewRecipeClient categoriesPromise={categoriesPromise} />
        </Suspense>
      </div>
    </>
  );
}

import RecipeCard, { RecipeCardSkeleton } from "./RecipeCard";
import { RecipeWithCategory } from "@/types";

export default async function RecipesGrid({
  recipesPromise,
}: {
  recipesPromise: Promise<RecipeWithCategory[]>;
}) {
  const recipes = await recipesPromise;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export function RecipesGridSkeleton({ pageSize }: { pageSize: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
      {Array.from({ length: pageSize }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  );
}

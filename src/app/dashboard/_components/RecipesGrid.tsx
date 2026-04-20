import RecipeCard, { RecipeCardSkeleton } from "./RecipeCard";
import { RecipeWithCategory } from "@/types";

export default async function RecipesGrid({
  recipesPromise,
}: {
  recipesPromise: Promise<RecipeWithCategory[]>;
}) {
  const recipes = await recipesPromise;

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export function RecipesGridSkeleton({ pageSize }: { pageSize: number }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {Array.from({ length: pageSize }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  );
}

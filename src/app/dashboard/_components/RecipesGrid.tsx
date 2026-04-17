import { fetchRecipesBlock } from "@/data/recipes";
import RecipeCard, { RecipeCardSkeleton } from "./RecipeCard";

export default async function RecipesGrid({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) {
  const offset = (page - 1) * pageSize;
  const recipes = await fetchRecipesBlock(pageSize, offset);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
}

export function RecipesGridSkeleton({ pageSize }: { pageSize: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array.from({ length: pageSize }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </div>
  );
}

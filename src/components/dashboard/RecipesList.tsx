import { RecipeWithCategory } from "@/types";
import RecipeCard from "./RecipeCard";
import ResponsiveGrid from "./ResponsiveGrid";
import { RecipesEmptyState } from "./RecipesEmptyState";
import { NUM_EAGER_LOADED_IMAGES } from "@/lib/constants";

export default async function RecipesList({
  recipesPromise,
  emptyState = <RecipesEmptyState />,
}: {
  recipesPromise: Promise<RecipeWithCategory[]>;
  /** Rendered in place of the grid when there are no recipes. */
  emptyState?: React.ReactNode;
}) {
  const recipes = await recipesPromise;

  if (recipes.length === 0) {
    return <>{emptyState}</>;
  }

  return (
    <ResponsiveGrid>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          imageLoading={index < NUM_EAGER_LOADED_IMAGES ? "eager" : "lazy"}
        />
      ))}
    </ResponsiveGrid>
  );
}

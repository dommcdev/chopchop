import { RecipeWithCategory } from "@/types";
import RecipeCard from "./RecipeCard";
import { NUM_EAGER_LOADED_IMAGES } from "@/lib/constants";

export default async function RecipesList({
  recipesPromise,
}: {
  recipesPromise: Promise<RecipeWithCategory[]>;
}) {
  const recipes = await recipesPromise;

  return (
    <>
      {recipes.map((recipe, index) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          imageLoading={index < NUM_EAGER_LOADED_IMAGES ? "eager" : "lazy"}
        />
      ))}
    </>
  );
}

import { RecipeWithCategory } from "@/types";
import RecipeCard from "../_components/RecipeCard";

export default async function RecipesList({
  recipesPromise,
}: {
  recipesPromise: Promise<RecipeWithCategory[]>;
}) {
  const recipes = await recipesPromise;

  return (
    <>
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </>
  );
}

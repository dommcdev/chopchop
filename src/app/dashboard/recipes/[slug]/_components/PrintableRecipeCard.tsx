import { calculateScaleFactor } from "@/data/recipes";
import { formatNumber } from "@/lib/utils";
import { PrintableRecipe, PrintableScaledIngredient } from "@/types";

interface PrintableRecipeCardProps {
  recipe: PrintableRecipe;
  targetServings: number;
  scaledIngredients: PrintableScaledIngredient[];
}

export function PrintableRecipeCard({
  recipe,
  targetServings,
  scaledIngredients,
}: PrintableRecipeCardProps) {
  const scaleFactor = calculateScaleFactor(targetServings, recipe.servings);

  return (
    <section className="bg-white text-black">
      <div className="mb-6 border-b border-neutral-200 pb-6">
        <h2 className="text-3xl font-bold text-neutral-900">{recipe.name}</h2>
        {recipe.description && (
          <p className="mt-2 text-neutral-600">{recipe.description}</p>
        )}

        <div className="mt-4 text-sm text-neutral-700">
          Base servings:{" "}
          <span className="font-semibold">{recipe.servings}</span>
          {"  ·  "}
          Scaled to: <span className="font-semibold">{targetServings}</span>
          {scaleFactor !== 1 && (
            <>
              {"  ·  "}
              Scale factor:{" "}
              <span className="font-semibold">
                {formatNumber(scaleFactor)}x
              </span>
            </>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-lg font-semibold text-neutral-900">
          Ingredients
        </h3>
        <ul className="space-y-2">
          {scaledIngredients.map((ingredient) => (
            <li
              key={ingredient.id}
              className="flex items-center gap-2 border-b border-neutral-100 py-2 text-sm text-neutral-800 break-inside-avoid"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />
              {ingredient.scaledAmount != null && (
                <span className="font-medium">
                  {formatNumber(ingredient.scaledAmount)}
                </span>
              )}
              {ingredient.unit && (
                <span className="text-neutral-500">{ingredient.unit}</span>
              )}
              <span>{ingredient.name}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="mb-3 text-lg font-semibold text-neutral-900">
          Instructions
        </h3>
        <ol className="space-y-4">
          {recipe.instructions.map((step, index) => (
            <li
              key={step.id}
              className="flex gap-3 text-sm text-neutral-800 break-inside-avoid"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="pt-0.5">{step.text}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

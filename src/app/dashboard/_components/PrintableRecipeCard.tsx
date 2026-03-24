/**
 * You can keep these types here, or export them from a shared types file
 * and import them into both your main viewer and this component.
 */
type Ingredient = {
  id: number;
  name: string;
  amount: number;
  unit: string;
};

type ScaledIngredient = Ingredient & {
  scaledAmount: number;
};

type Recipe = {
  title: string;
  description: string;
  servings: number;
  ingredients: Ingredient[];
  instructions: string[];
};

type PrintableRecipeCardProps = {
  recipe: Recipe;
  targetServings: number;
  scaleFactor: number;
  scaledIngredients: ScaledIngredient[];
};

/**
 * Formats numbers cleanly for display
 */
function formatNumber(value: number) {
  if (Number.isInteger(value)) return value.toString();
  return value
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

export function PrintableRecipeCard({
  recipe,
  targetServings,
  scaleFactor,
  scaledIngredients,
}: PrintableRecipeCardProps) {
  return (
    <section className="bg-white text-black">
      {/* Recipe title, description, and serving summary */}
      <div className="mb-6 border-b border-neutral-200 pb-6">
        <h2 className="text-3xl font-bold text-neutral-900">{recipe.title}</h2>
        <p className="mt-2 text-neutral-600">{recipe.description}</p>

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

      {/* Ingredients list */}
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
              <span className="font-medium">
                {formatNumber(ingredient.scaledAmount)}
              </span>
              {ingredient.unit && (
                <span className="text-neutral-500">{ingredient.unit}</span>
              )}
              <span>{ingredient.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions list */}
      <div className="mb-6">
        <h3 className="mb-3 text-lg font-semibold text-neutral-900">
          Instructions
        </h3>
        <ol className="space-y-4">
          {recipe.instructions.map((step, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm text-neutral-800 break-inside-avoid"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                {index + 1}
              </span>
              <span className="pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

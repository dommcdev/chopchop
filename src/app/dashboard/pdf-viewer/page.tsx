"use client";

// React hooks for state and memoized calculations

import { useMemo, useState } from "react";

/**

* Each ingredient in the recipe

*/

type Ingredient = {
  id: number; // unique id for React key prop

  name: string; // ingredient name

  amount: number; // base amount before scaling

  unit: string; // measurement unit like oz, tsp, lb
};

/**

* Full recipe structure

*/

type Recipe = {
  title: string;

  description: string;

  servings: number;

  ingredients: Ingredient[];

  instructions: string[];
};

/**

* Sample recipe shown when the page first loads

* Later this could come from a database or be passed in via URL params

*/

const initialRecipe: Recipe = {
  title: "Mac and Cheese",
  description: "An easy classic that comes together in under 30 minutes.",

  servings: 4,
  ingredients: [
    { id: 1, name: "Elbow macaroni", amount: 2, unit: "cup" },

    { id: 2, name: "Butter", amount: 3, unit: "tbsp" },

    { id: 3, name: "All-purpose flour", amount: 3, unit: "tbsp" },

    { id: 4, name: "Milk", amount: 2, unit: "cup" },

    { id: 5, name: "Shredded cheddar cheese", amount: 2, unit: "cup" },

    { id: 6, name: "Salt", amount: 0.5, unit: "tsp" },

    { id: 7, name: "Black pepper", amount: 0.25, unit: "tsp" },

    { id: 8, name: "Garlic powder", amount: 0.25, unit: "tsp" },
  ],

  instructions: [
    "Boil a large pot of salted water and cook the macaroni until al dente. Drain and set aside.",

    "In the same pot, melt butter over medium heat.",

    "Whisk in the flour and cook for about 1 minute until it smells nutty.",

    "Slowly pour in the milk while whisking constantly so no lumps form.",

    "Stir until the sauce thickens, about 3 to 4 minutes.",

    "Remove from heat and stir in the shredded cheddar until fully melted.",

    "Add salt, pepper, and garlic powder. Taste and adjust seasoning.",

    "Toss the drained macaroni into the cheese sauce and stir to coat.",
  ],
};

/**

* Formats numbers cleanly for display

* 1      -> "1"

* 1.5    -> "1.5"

* 1.3333 -> "1.33"

*/

function formatNumber(value: number) {
  if (Number.isInteger(value)) return value.toString();

  return value
    .toFixed(2)
    .replace(/\.00$/, "")
    .replace(/(\.\d)0$/, "$1");
}

export default function RecipePrintPage() {
  /**

   * recipe = the recipe being displayed on this page

   * We use useState here even though we don't edit it,

   * because in the future it could be fetched or passed in

   */

  const [recipe] = useState<Recipe>(initialRecipe);

  /**

   * targetServings = how many servings the user wants to scale to

   * They can change this before hitting print

   */

  const [targetServings, setTargetServings] = useState<number>(
    initialRecipe.servings,
  );

  /**

   * scaleFactor = the multiplier applied to each ingredient amount

   * Example: base servings = 4, target = 8, scaleFactor = 2

   */

  const scaleFactor = useMemo(() => {
    if (!recipe.servings || targetServings <= 0) return 1;

    return targetServings / recipe.servings;
  }, [recipe.servings, targetServings]);

  /**

   * scaledIngredients = ingredient list with amounts adjusted for targetServings

   * We never modify the original recipe data — just layer the scaled amount on top

   */

  const scaledIngredients = useMemo(() => {
    return recipe.ingredients.map((ingredient) => ({
      ...ingredient,

      scaledAmount: ingredient.amount * scaleFactor,
    }));
  }, [recipe.ingredients, scaleFactor]);

  return (
    <>
      {/*

        These styles only appear when the user prints.

        The .no-print class makes the controls disappear from the printed page

        so the button and inputs don't show up on the printed page.

      */}
      <style>{`

        @media print {

          .no-print {

            display: none !important;

          }

          body {

            background: white;

          }

        }

      `}</style>
      <style>{`
  @media print {
    .no-print {
      display: none !important;
    }

    body {
      background: white;
    }
  }
`}</style>
      <main className="min-h-screen bg-neutral-50 p-6">
        <div className="mx-auto max-w-2xl">
          {/*

            Print controls bar that disappears when printing.

            Lets you change the servings and print it out as a PDF.

          */}

          <div className="no-print mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-neutral-900">
              Print Preview
            </h1>

            <div className="flex items-center gap-3">
              <label className="text-sm font-medium text-neutral-700">
                Servings:
              </label>

              <input
                type="number"
                min={1}
                value={targetServings}
                onChange={(e) => setTargetServings(Number(e.target.value) || 1)}
                className="w-20 rounded-lg border border-neutral-300 px-3 py-2 text-center outline-none focus:border-neutral-500"
              />

              <button
                type="button"
                onClick={() => window.print()}
                className="rounded-lg bg-black px-5 py-2 text-sm font-medium text-white hover:opacity-90"
              >
                Print / Save PDF
              </button>
            </div>
          </div>

          {/*

            The actual printable recipe card.

            This is the only thing that shows up on the printed page.

          */}

          <section className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
            {/* Recipe title, description, and serving summary */}

            <div className="mb-6 border-b border-neutral-200 pb-6">
              <h2 className="text-3xl font-bold text-neutral-900">
                {recipe.title}
              </h2>

              <p className="mt-2 text-neutral-600">{recipe.description}</p>

              <div className="mt-4 rounded-xl bg-neutral-100 p-3 text-sm text-neutral-700">
                Base servings:{" "}
                <span className="font-semibold">{recipe.servings}</span>
                {"  ·  "}
                Scaled to:{" "}
                <span className="font-semibold">{targetServings}</span>
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
                    className="flex items-center gap-2 border-b border-neutral-100 py-2 text-sm text-neutral-800"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-400" />

                    <span className="font-medium">
                      {formatNumber(ingredient.scaledAmount)}
                    </span>

                    {ingredient.unit && (
                      <span className="text-neutral-500">
                        {ingredient.unit}
                      </span>
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
                    className="flex gap-3 text-sm text-neutral-800"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-900 text-xs font-bold text-white">
                      {index + 1}
                    </span>

                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/*

              Footer is only visible on the printed page.


            */}

            <div className="border-t border-neutral-200 pt-4 text-center text-xs text-neutral-400">
              Generated by ChopChop!
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

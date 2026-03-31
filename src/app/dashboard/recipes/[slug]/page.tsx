//TODO fix vibe slop

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import {
  PrintableRecipeCard,
  type PrintableRecipeCardRecipe,
  type PrintableScaledIngredient,
} from "@/app/dashboard/_components/PrintableRecipeCard";
import { PrintRecipeButton } from "@/app/dashboard/_components/PrintRecipeButton";

function resolveTargetServings(baseServings: number, targetServings?: number) {
  if (targetServings == null || targetServings <= 0) {
    return baseServings;
  }

  return targetServings;
}

function getScaleFactor(baseServings: number, targetServings: number) {
  if (baseServings <= 0) return 1;
  return targetServings / baseServings;
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();
  const { slug } = await params;

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Please sign in</h1>
          <p className="text-muted-foreground">
            You need to be signed in to view recipes.
          </p>
        </div>
      </div>
    );
  }

  // Fetch the recipe by URL segment (human slug or stable public id)
  const recipe = await db.query.recipes.findFirst({
    where: and(
      eq(recipes.userId, userId),
      or(eq(recipes.slug, slug), eq(recipes.publicId, slug)),
    ),
    with: {
      category: true,
      ingredients: {
        orderBy: (ingredients, { asc }) => [asc(ingredients.id)],
      },
      instructions: {
        orderBy: (instructions, { asc }) => [asc(instructions.stepNumber)],
      },
    },
  });

  if (!recipe) {
    notFound();
  }

  const targetServings = resolveTargetServings(recipe.servings);
  const scaleFactor = getScaleFactor(recipe.servings, targetServings);

  const scaledIngredients: PrintableScaledIngredient[] = recipe.ingredients.map(
    (ingredient) => ({
      id: ingredient.id,
      name: ingredient.name,
      unit: ingredient.unit,
      scaledAmount:
        ingredient.quantity == null ? null : ingredient.quantity * scaleFactor,
    }),
  );

  const printableRecipe: PrintableRecipeCardRecipe = {
    name: recipe.name,
    description: recipe.description ?? "",
    servings: recipe.servings,
    instructions: recipe.instructions.map((instruction) => ({
      id: instruction.id,
      text: instruction.text,
    })),
  };

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <div className="print:hidden">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <PrintRecipeButton />
        </div>

        <div className="border-[3px] border-foreground rounded-none shadow-[8px_8px_0px_0px_var(--foreground)] bg-card overflow-hidden">
          {/* Header */}
          <div className="border-b-[3px] border-foreground p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h1 className="text-3xl font-black tracking-tighter mb-2">
                  {recipe.name}
                </h1>
                {recipe.description && (
                  <p className="text-sm text-muted-foreground">
                    {recipe.description}
                  </p>
                )}
              </div>
              {recipe.category && (
                <span className="text-xs border-[2px] border-foreground px-2 py-1 rounded-none bg-primary/10 font-bold uppercase tracking-wider">
                  {recipe.category.name}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-4 text-xs">
              <div className="flex items-center gap-1">
                <span className="font-bold">Servings:</span>
                <span>{recipe.servings}</span>
              </div>
              {recipe.prepTime && (
                <div className="flex items-center gap-1">
                  <span className="font-bold">Prep:</span>
                  <span>{recipe.prepTime} min</span>
                </div>
              )}
              {recipe.cookTime && (
                <div className="flex items-center gap-1">
                  <span className="font-bold">Cook:</span>
                  <span>{recipe.cookTime} min</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_2fr]">
            {/* Ingredients */}
            <div className="p-6 border-b-[3px] md:border-b-0 md:border-r-[3px] border-foreground">
              <h2 className="text-xl font-black tracking-tighter mb-4 uppercase">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <li key={ingredient.id} className="text-sm flex gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>
                      {ingredient.quantity && ingredient.unit && (
                        <span className="font-medium">
                          {ingredient.quantity} {ingredient.unit}{" "}
                        </span>
                      )}
                      {ingredient.name}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div className="p-6">
              <h2 className="text-xl font-black tracking-tighter mb-4 uppercase">
                Instructions
              </h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction) => (
                  <li key={instruction.id} className="flex gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center h-7 w-7 rounded-none border-[2px] border-foreground bg-primary font-bold text-xs text-primary-foreground">
                      {instruction.stepNumber}
                    </span>
                    <p className="text-sm pt-1">{instruction.text}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden print:block">
        <PrintableRecipeCard
          recipe={printableRecipe}
          targetServings={targetServings}
          scaleFactor={scaleFactor}
          scaledIngredients={scaledIngredients}
        />
      </div>
    </div>
  );
}

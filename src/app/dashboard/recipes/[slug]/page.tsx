//TODO fix vibe slop

import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { and, eq, or } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import {
  PrintableRecipeCard,
  type PrintableRecipeCardRecipe,
  type PrintableScaledIngredient,
} from "@/app/dashboard/recipes/[slug]/_components/PrintableRecipeCard";
import { RecipeViewToolbar } from "@/app/dashboard/recipes/[slug]/_components/RecipeViewToolbar";

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
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8 xl:max-w-6xl">
      <div className="print:hidden">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft weight="bold" className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="relative border-[3px] border-foreground rounded-none bg-card overflow-hidden">
          <div className="absolute right-3 top-3 z-20 print:hidden">
            <RecipeViewToolbar recipeSlug={recipe.slug} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
            {recipe.imageUrl ? (
              <div className="relative col-span-1 aspect-[4/3] w-full overflow-hidden border-b-[3px] border-foreground bg-muted md:col-span-1 md:row-start-1 md:aspect-auto md:max-h-56 md:min-h-[10rem] md:border-b-[3px] md:border-r-[3px] lg:max-h-60 lg:min-h-[11rem]">
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  fill
                  sizes="(min-width: 1024px) 17rem, (min-width: 768px) 14rem, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="relative col-span-1 aspect-[4/3] w-full overflow-hidden border-b-[3px] border-foreground bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:1.2rem_1.2rem] bg-muted md:col-span-1 md:row-start-1 md:aspect-auto md:min-h-[10rem] md:max-h-56 md:border-b-[3px] md:border-r-[3px] lg:min-h-[11rem] lg:max-h-60">
                <div className="flex h-full min-h-[inherit] items-end justify-between bg-[radial-gradient(circle_at_top_left,var(--primary)_0%,transparent_45%)] p-4 md:absolute md:inset-0">
                  <span className="border-[2px] border-foreground bg-background px-2 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-foreground">
                    No Photo
                  </span>
                  <span className="text-4xl font-black leading-none text-foreground/10">
                    CC
                  </span>
                </div>
              </div>
            )}

            <div className="col-span-1 flex min-w-0 flex-col justify-center border-b-[3px] border-foreground p-5 sm:p-6 md:col-span-1 md:col-start-2 md:row-start-1 md:border-b-[3px] md:pr-28">
              <div className="min-w-0">
                <h1 className="mb-2 text-2xl font-black tracking-tighter sm:text-3xl md:text-4xl">
                  {recipe.name}
                </h1>
                {recipe.description && (
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {recipe.description}
                  </p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                {recipe.category && (
                  <span className="shrink-0 border-[2px] border-foreground bg-primary/10 px-2 py-1 font-bold uppercase tracking-wider">
                    {recipe.category.name}
                  </span>
                )}
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

            <div className="col-span-1 border-b-[3px] border-foreground p-5 md:col-span-1 md:col-start-1 md:row-start-2 md:min-w-0 md:border-b-0 md:border-r-[3px] md:p-6">
              <h2 className="mb-4 text-xl font-black uppercase tracking-tighter">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient) => (
                  <li
                    key={ingredient.id}
                    className="flex gap-2 break-words text-sm"
                  >
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

            <div className="col-span-1 min-w-0 p-5 sm:p-6 md:col-span-1 md:col-start-2 md:row-start-2">
              <h2 className="mb-4 text-xl font-black uppercase tracking-tighter">
                Instructions
              </h2>
              <ol className="list-none space-y-4">
                {recipe.instructions.map((instruction) => (
                  <li key={instruction.id} className="flex gap-3">
                    <span className="w-6 flex-shrink-0 pt-0.5 text-right text-xs font-semibold tabular-nums text-muted-foreground">
                      {instruction.stepNumber}.
                    </span>
                    <p className="pt-0.5 text-sm">{instruction.text}</p>
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

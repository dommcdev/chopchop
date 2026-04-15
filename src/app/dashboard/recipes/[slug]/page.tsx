import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { PrintableRecipeCard } from "@/app/dashboard/recipes/[slug]/_components/PrintableRecipeCard";
import { RecipeViewToolbar } from "@/app/dashboard/recipes/[slug]/_components/RecipeViewToolbar";
import { calculateScaleFactor, cn } from "@/lib/utils";
import { fetchAllRecipeData } from "@/data/recipes";
import { getScaledIngredients } from "@/lib/utils";

const recipeMediaShellClassName = cn(
  "relative h-full min-h-0 w-full overflow-hidden bg-muted",
  "aspect-[3/4] max-h-52 border-l-[3px] border-foreground md:border-l-0",
  "md:aspect-auto md:max-h-none md:min-h-[10rem] md:max-h-56 md:border-b-[3px] md:border-r-[3px]",
  "lg:min-h-[11rem] lg:max-h-60",
);

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await fetchAllRecipeData(slug);

  if (!recipe) {
    notFound();
  }

  const scaleFactor = calculateScaleFactor(recipe?.servings, recipe?.servings);
  const scaledIngredients = getScaledIngredients(
    recipe?.ingredients,
    scaleFactor,
  );

  const mediaBlock = recipe.imageUrl ? (
    <div className={recipeMediaShellClassName}>
      <Image
        src={recipe.imageUrl}
        alt={recipe.name}
        fill
        sizes="(max-width: 767px) 40vw, (min-width: 1024px) 17rem, 14rem"
        className="object-cover"
        priority
      />
    </div>
  ) : (
    <div
      className={cn(
        recipeMediaShellClassName,
        "bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:1.2rem_1.2rem]",
      )}
    >
      <div className="flex h-full min-h-[inherit] items-end justify-between bg-[radial-gradient(circle_at_top_left,var(--primary)_0%,transparent_45%)] p-3 md:absolute md:inset-0 md:p-4">
        <span className="border-[2px] border-foreground bg-background px-2 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-foreground">
          No Photo
        </span>
        <span className="text-3xl font-black leading-none text-foreground/10 md:text-4xl">
          CC
        </span>
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8 xl:max-w-6xl">
      <div className="print:hidden">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeftIcon weight="bold" className="h-4 w-4" />
            Back to Dashboard
          </Link>
        </div>

        <div className="relative overflow-hidden rounded-none border-[3px] border-foreground bg-card">
          <div className="pointer-events-none absolute right-3 top-3 z-30 print:hidden">
            <div className="pointer-events-auto">
              <RecipeViewToolbar
                recipeSlug={recipe.slug}
                recipePublicId={recipe.publicId}
              />
            </div>
          </div>

          <div className="flex flex-col md:grid md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
            <div className="min-w-0 border-b-[3px] border-foreground py-5 ps-5 pe-20 sm:py-6 sm:ps-6 sm:pe-20 md:col-start-2 md:row-start-1 md:border-b-[3px] md:py-6 md:ps-6 md:pt-6 md:pe-10">
              {/* Inline end padding clears the floating toolbar; values are from the spacing scale */}
              <div className="min-w-0 max-w-prose md:max-w-none">
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
                {recipe.prepTime != null && recipe.prepTime > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="font-bold">Prep:</span>
                    <span>{recipe.prepTime} min</span>
                  </div>
                )}
                {recipe.cookTime != null && recipe.cookTime > 0 && (
                  <div className="flex items-center gap-1">
                    <span className="font-bold">Cook:</span>
                    <span>{recipe.cookTime} min</span>
                  </div>
                )}
              </div>
            </div>

            <div className="grid min-h-0 min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,50%)] border-b-[3px] border-foreground md:contents md:min-h-0 md:border-b-0">
              <div className="min-w-0 p-4 sm:p-5 md:col-start-1 md:row-start-2 md:flex md:h-full md:flex-col md:border-r-[3px] md:border-foreground md:p-6">
                <h2 className="mb-3 text-lg font-black uppercase tracking-tighter md:mb-4 md:text-xl">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {recipe.ingredients.map((ingredient) => (
                    <li
                      key={ingredient.id}
                      className="flex gap-2 break-words text-sm"
                    >
                      <span className="font-bold text-primary">•</span>
                      <span>
                        {ingredient.quantity != null && ingredient.unit && (
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

              <div className="min-h-0 min-w-0 md:col-start-1 md:row-start-1 md:flex md:h-full md:flex-col">
                {mediaBlock}
              </div>
            </div>

            <div className="min-w-0 p-5 sm:p-6 md:col-start-2 md:row-start-2">
              <h2 className="mb-4 text-xl font-black uppercase tracking-tighter">
                Instructions
              </h2>
              <ol className="list-none space-y-4">
                {recipe.instructions.map((instruction) => (
                  <li key={instruction.id} className="flex gap-3">
                    <span className="w-6 shrink-0 pt-0.5 text-right text-xs font-semibold tabular-nums text-muted-foreground">
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
          recipe={recipe}
          targetServings={recipe.servings}
          scaledIngredients={scaledIngredients}
        />
      </div>
    </div>
  );
}

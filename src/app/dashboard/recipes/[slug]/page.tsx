import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { PrintableRecipeCard } from "@/app/dashboard/recipes/[slug]/_components/PrintableRecipeCard";
import { RecipeViewToolbar } from "@/app/dashboard/recipes/[slug]/_components/RecipeViewToolbar";
import { RecipeInstructions } from "@/app/dashboard/recipes/[slug]/_components/RecipeInstructions";
import { RecipeIngredients } from "@/app/dashboard/recipes/[slug]/_components/RecipeIngredients";
import { calculateScaleFactor } from "@/lib/utils";
import { fetchRecipeBlob } from "@/data/recipes";
import { getScaledIngredients } from "@/lib/utils";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = await fetchRecipeBlob(slug);

  if (!recipe) {
    notFound();
  }

  const scaleFactor = calculateScaleFactor(recipe?.servings, recipe?.servings);
  const scaledIngredients = getScaledIngredients(
    recipe?.ingredients,
    scaleFactor,
  );

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8 xl:max-w-6xl">
      <div className="print:hidden">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon weight="bold" className="h-4 w-4 shrink-0" />
            Back to Dashboard
          </Link>
        </div>

        <div className="overflow-hidden border border-border bg-card shadow-sm">
          <div className="border-b border-border p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {recipe.category && (
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {recipe.category.name}
                  </span>
                )}
                <h1 className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {recipe.name}
                </h1>
                {recipe.description && (
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                    {recipe.description}
                  </p>
                )}
              </div>
              <div className="shrink-0 print:hidden">
                <RecipeViewToolbar
                  recipeSlug={recipe.slug}
                  recipePublicId={recipe.publicId}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                <span>Servings:</span>
                <span className="text-foreground">{recipe.servings}</span>
              </div>
              {recipe.prepTime != null && recipe.prepTime > 0 && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <span>Prep:</span>
                  <span className="text-foreground">{recipe.prepTime} min</span>
                </div>
              )}
              {recipe.cookTime != null && recipe.cookTime > 0 && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <span>Cook:</span>
                  <span className="text-foreground">{recipe.cookTime} min</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 border-b border-border md:grid-cols-2">
            <div className="order-2 p-5 sm:p-6 md:order-1 md:border-r md:border-border">
              <h2 className="mb-4 text-lg font-semibold tracking-tight md:text-xl">
                Ingredients
              </h2>
              <RecipeIngredients ingredients={recipe.ingredients} />
            </div>

            <div className="relative order-1 min-h-[16rem] w-full overflow-hidden border-b border-border bg-muted md:order-2 md:h-full md:border-b-0">
              {recipe.imageUrl ? (
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full min-h-[16rem] items-center justify-center md:min-h-full">
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground/50">
                    No Photo
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <h2 className="mb-5 text-lg font-semibold tracking-tight md:text-xl">
              Instructions
            </h2>
            <RecipeInstructions instructions={recipe.instructions} />
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

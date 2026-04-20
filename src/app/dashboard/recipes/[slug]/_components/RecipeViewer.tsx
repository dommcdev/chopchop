import Image from "next/image";
import { PrintableRecipeCard } from "./PrintableRecipeCard";
import { RecipeViewToolbar } from "./RecipeViewToolbar";
import { RecipeInstructions } from "./RecipeInstructions";
import { RecipeIngredients } from "./RecipeIngredients";
import { calculateScaleFactor, getScaledIngredients } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchRecipeBlob } from "@/data/recipes";
import { notFound } from "next/navigation";

export async function RecipeViewer({ slug }: { slug: string }) {
  const recipe = await fetchRecipeBlob(slug);

  if (!recipe) {
    notFound();
  }

  const scaleFactor = calculateScaleFactor(recipe.servings, recipe.servings);
  const scaledIngredients = getScaledIngredients(
    recipe.ingredients,
    scaleFactor,
  );

  return (
    <>
      <div className="print:hidden">
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
    </>
  );
}

export function RecipeViewerSkeleton() {
  return (
    <div className="print:hidden overflow-hidden border border-border bg-card shadow-sm">
      <div className="border-b border-border p-5 sm:p-6 space-y-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-3/4 sm:w-1/2" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-6 w-1/3 mt-4" />
      </div>

      <div className="grid grid-cols-1 border-b border-border md:grid-cols-2">
        <div className="order-2 p-5 sm:p-6 md:order-1 md:border-r md:border-border">
          <Skeleton className="mb-4 h-7 w-32" />
          <Skeleton className="h-[200px] w-full rounded-md" />
        </div>

        <div className="relative order-1 aspect-video w-full md:order-2 md:h-full md:aspect-auto border-b md:border-b-0 border-border">
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <Skeleton className="mb-5 h-7 w-32" />
        <Skeleton className="h-[300px] w-full rounded-md" />
      </div>
    </div>
  );
}

import Image from "next/image";
import { PrintableRecipeCard } from "./PrintableRecipeCard";
import { RecipeToolbar } from "./RecipeToolbar";
import { RecipeInstructions } from "./RecipeInstructions";
import { RecipeIngredients } from "./RecipeIngredients";
import { calculateScaleFactor, getScaledIngredients } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { RecipeBlob } from "@/types";

export function RecipeViewer({
  recipe,
  canEdit,
}: {
  recipe: RecipeBlob;
  canEdit: boolean;
}) {
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
                <RecipeToolbar
                  recipeSlug={recipe.slug}
                  recipePublicId={recipe.publicId}
                  canEdit={canEdit}
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
      {/* Header Section: */}
      <div className="border-b border-border p-5 sm:p-6">
        <div className="space-y-3">
          <Skeleton className="h-3 w-20" /> {/* Category */}
          <Skeleton className="h-9 w-2/3" /> {/* Title */}
          <Skeleton className="h-5 w-full" /> {/* Description line 1 */}
          <Skeleton className="h-5 w-4/5" /> {/* Description line 2 */}
        </div>
        <div className="mt-6 flex gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 border-b border-border md:grid-cols-2">
        {/* Ingredients Column */}
        <div className="order-2 p-5 sm:p-6 md:order-1 md:border-r md:border-border">
          <Skeleton className="mb-4 h-7 w-32" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>

        {/* Image Column: */}
        <div className="relative order-1 min-h-[16rem] w-full bg-muted md:order-2 md:h-full">
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        </div>
      </div>

      {/* Instructions Section */}
      <div className="p-5 sm:p-6">
        <Skeleton className="mb-5 h-5 w-32" />
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-15 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

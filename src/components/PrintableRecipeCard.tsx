import { formatNumber } from "@/lib/utils";
import { PrintableRecipe, PrintableScaledIngredient } from "@/types";
import { QRCodeSVG } from "qrcode.react";

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
  const shareUrl = `https://lechopchop.vercel.app/s/${recipe.publicId}`;
  return (
    <section className="bg-white p-4 text-black sm:p-8">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {recipe.name}
        </h1>
        {recipe.description && (
          <p className="mt-2 max-w-prose text-sm leading-relaxed text-black/70">
            {recipe.description}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[10px] font-bold uppercase tracking-widest text-black/60">
          {recipe.category && (
            <span>
              Category:{" "}
              <span className="text-black">{recipe.category.name}</span>
            </span>
          )}
          <span>
            Servings: <span className="text-black">{targetServings}</span>
          </span>
          {recipe.prepTime != null && recipe.prepTime > 0 && (
            <span>
              Prep: <span className="text-black">{recipe.prepTime} min</span>
            </span>
          )}
          {recipe.cookTime != null && recipe.cookTime > 0 && (
            <span>
              Cook: <span className="text-black">{recipe.cookTime} min</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 border-t-[3px] border-black pt-6 sm:grid-cols-3">
        {/* INGREDIENTS */}
        <div className="sm:col-span-1">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {scaledIngredients.map((ingredient) => (
              <li
                key={ingredient.id}
                className="flex items-start gap-3 break-inside-avoid text-sm"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-black" />
                <span className="leading-relaxed">
                  {ingredient.scaledAmount != null && (
                    <span className="font-bold">
                      {formatNumber(ingredient.scaledAmount)}{" "}
                      {ingredient.unit}{" "}
                    </span>
                  )}
                  <span className="text-black/80">{ingredient.name}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* INSTRUCTIONS */}
        <div className="sm:col-span-2">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">
            Instructions
          </h2>
          <ol className="space-y-5">
            {recipe.instructions.map((step, index) => (
              <li
                key={step.id}
                className="flex gap-4 break-inside-avoid text-sm"
              >
                <span className="mt-0.5 shrink-0 font-semibold tabular-nums text-black/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="leading-relaxed text-black/90">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* FOOTER / QR CODE */}
      <div className="mt-12 flex items-center gap-4 break-inside-avoid border-t-[3px] border-black pt-6">
        <QRCodeSVG value={shareUrl} size={56} level="L" className="shrink-0" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-bold tracking-tight text-black">
            View this recipe online
          </span>
          <span className="text-xs text-black/70">{shareUrl}</span>
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Category, Recipe } from "@/db/schema";

export type RecipeCardRecipe = Recipe & { category: Category | null };

function totalCookMinutes(recipe: Recipe) {
  return (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);
}

export default function RecipeCard({ recipe }: { recipe: RecipeCardRecipe }) {
  const totalMin = totalCookMinutes(recipe);

  return (
    <Link
      href={`/dashboard/r/${recipe.slug}`}
      className="group flex h-full flex-col overflow-hidden border-[3px] border-foreground bg-card transition-all duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
    >
      <div
        className={`relative aspect-[2/1] overflow-hidden border-b-[3px] border-foreground ${
          recipe.imageUrl ? "bg-muted" : "bg-white dark:bg-background"
        }`}
      >
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 25vw, 16vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : null}
        {recipe.category ? (
          <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate border-[2px] border-foreground bg-background px-1.5 py-0.5 text-[9px] font-black uppercase tracking-[0.16em] text-foreground">
            {recipe.category.name}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <h2 className="line-clamp-2 min-h-[2.25rem] text-sm font-black uppercase tracking-tight text-foreground">
          {recipe.name}
        </h2>

        <p className="line-clamp-2 text-xs text-muted-foreground">
          {recipe.description || "No description provided yet."}
        </p>

        {totalMin > 0 ? (
          <div className="mt-auto border-t-[3px] border-foreground pt-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            {totalMin} min total
          </div>
        ) : null}
      </div>
    </Link>
  );
}

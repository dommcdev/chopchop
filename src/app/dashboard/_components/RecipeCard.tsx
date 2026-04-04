import Link from "next/link";
import { Recipe } from "@/db/schema";

function getMetaItems(recipe: Recipe) {
  const totalTime = (recipe.prepTime ?? 0) + (recipe.cookTime ?? 0);

  return [
    totalTime > 0 ? `${totalTime} min total` : null,
    recipe.prepTime ? `Prep ${recipe.prepTime}m` : null,
    recipe.cookTime ? `Cook ${recipe.cookTime}m` : null,
    recipe.servings ? `${recipe.servings} servings` : null,
  ].filter((item): item is string => Boolean(item));
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  const metaItems = getMetaItems(recipe);

  return (
    <Link
      href={`/dashboard/r/${recipe.slug}`}
      className="group flex h-full flex-col overflow-hidden border-[3px] border-foreground bg-card shadow-[6px_6px_0px_0px_var(--foreground)] transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_var(--primary)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
    >
      <div className="relative aspect-[4/3] border-b-[3px] border-foreground overflow-hidden bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:1.2rem_1.2rem] bg-muted">
        {recipe.imageUrl ? (
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-end justify-between bg-[radial-gradient(circle_at_top_left,var(--primary)_0%,transparent_45%)] p-4">
            <span className="border-[2px] border-foreground bg-background px-2 py-1 text-[10px] font-black uppercase tracking-[0.24em] text-foreground">
              No Photo
            </span>
            <span className="text-4xl font-black leading-none text-foreground/10">
              CC
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h2 className="line-clamp-2 min-h-[2.5rem] text-base font-black uppercase tracking-tight text-foreground sm:text-lg">
          {recipe.name}
        </h2>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {recipe.description || "No description provided yet."}
        </p>

        <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 border-t-[3px] border-foreground pt-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
          {metaItems.length > 0 ? (
            metaItems.map((item) => <span key={item}>{item}</span>)
          ) : (
            <span>Recipe details coming soon</span>
          )}
        </div>
      </div>
    </Link>
  );
}

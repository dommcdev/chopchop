import { Skeleton } from "@/components/ui/skeleton";
import { RecipeCardSkeleton } from "@/app/dashboard/_components/RecipeCardSkeleton";

export function BrowseRecipesSkeleton({
  count = 20,
}: {
  count?: number;
}) {
  return (
    <div className="m-4 flex flex-col gap-2 md:m-6">
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <Skeleton className="h-6 w-40" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: count }).map((_, i) => (
          <RecipeCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}


import { Skeleton } from "@/components/ui/skeleton";

export function RecipeCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden border-[3px] border-foreground bg-card">
      <div className="relative aspect-[2/1] overflow-hidden border-b-[3px] border-foreground bg-muted">
        <Skeleton className="absolute inset-0" />
        <Skeleton className="absolute left-2 top-2 h-5 w-20 border-[2px] border-foreground bg-background/50" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="space-y-2">
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        <div className="space-y-2 pt-1">
          <Skeleton className="h-3 w-full" />
          <Skeleton className="h-3 w-5/6" />
        </div>

        <div className="mt-auto border-t-[3px] border-foreground pt-2">
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

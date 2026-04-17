import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const recipeMediaShellClassName = cn(
  "relative h-full min-h-0 w-full overflow-hidden bg-muted",
  "aspect-[3/4] max-h-52 border-l-[3px] border-foreground md:border-l-0",
  "md:aspect-auto md:max-h-none md:min-h-[10rem] md:max-h-56 md:border-b-[3px] md:border-r-[3px]",
  "lg:min-h-[11rem] lg:max-h-60",
);

export function RecipePageSkeleton() {
  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8 xl:max-w-6xl">
      <div className="print:hidden">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <Skeleton className="h-5 w-40" />
        </div>

        <div className="relative overflow-hidden rounded-none border-[3px] border-foreground bg-card">
          <div className="flex flex-col md:grid md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:grid-rows-[auto_minmax(0,1fr)] lg:grid-cols-[minmax(0,17rem)_minmax(0,1fr)]">
            <div className="min-w-0 border-b-[3px] border-foreground py-5 ps-5 pe-20 sm:py-6 sm:ps-6 sm:pe-20 md:col-start-2 md:row-start-1 md:border-b-[3px] md:py-6 md:ps-6 md:pt-6 md:pe-10">
              <div className="min-w-0 max-w-prose md:max-w-none">
                <div className="space-y-3">
                  <Skeleton className="h-9 w-3/4" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-5/6" />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
                <Skeleton className="h-7 w-28 border-[2px] border-foreground bg-primary/10" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>

            <div className="grid min-h-0 min-w-0 grid-cols-[minmax(0,1fr)_minmax(0,50%)] border-b-[3px] border-foreground md:contents md:min-h-0 md:border-b-0">
              <div className="min-w-0 p-4 sm:p-5 md:col-start-1 md:row-start-2 md:flex md:h-full md:flex-col md:border-r-[3px] md:border-foreground md:p-6">
                <Skeleton className="mb-4 h-7 w-36" />
                <ul className="space-y-2">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Skeleton className="h-3 w-3" />
                      <Skeleton className="h-4 w-full" />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-h-0 min-w-0 md:col-start-1 md:row-start-1 md:flex md:h-full md:flex-col">
                <div className={recipeMediaShellClassName}>
                  <Skeleton className="absolute inset-0" />
                </div>
              </div>
            </div>

            <div className="min-w-0 p-5 sm:p-6 md:col-start-2 md:row-start-2">
              <Skeleton className="mb-5 h-8 w-44" />
              <ol className="space-y-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <li key={i} className="flex gap-3">
                    <Skeleton className="mt-0.5 h-4 w-6" />
                    <div className="flex-1 space-y-2 pt-0.5">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

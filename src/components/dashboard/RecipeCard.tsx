import Image from "next/image";
import Link from "next/link";
import { FileImageIcon } from "@phosphor-icons/react/dist/ssr";
import { CirclesThreePlusIcon } from "@phosphor-icons/react/dist/ssr";
import { RecipeWithCategory } from "@/types";
import { totalCookMinutes } from "@/lib/utils";
import { RecipeCardMenu } from "@/components/dashboard/RecipeCardMenu";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function RecipeCard({ recipe }: { recipe: RecipeWithCategory }) {
  const totalMin = totalCookMinutes(recipe);

  return (
    <div className="relative h-full">
      <Link
        href={`/dashboard/r/${recipe.slug}`}
        className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Card className="flex h-full flex-col overflow-hidden rounded-none pt-0 transition-all duration-300 ease-in-out hover:bg-muted/40 hover:shadow-sm dark:hover:bg-muted/60 dark:hover:ring-foreground/20 dark:hover:shadow-black/30 will-change-transform group-hover:bg-muted/40 group-hover:shadow-sm dark:group-hover:bg-muted/60 dark:group-hover:ring-foreground/20 dark:group-hover:shadow-black/30">
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            {recipe.imageUrl ? (
              <Image
                src={recipe.imageUrl}
                alt={recipe.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                <FileImageIcon className="size-10" aria-hidden="true" />
              </div>
            )}
          </div>

          <CardHeader>
            <div className="flex min-w-0 flex-col gap-1">
              <CardTitle className="line-clamp-1 text-xl">
                {recipe.name}
              </CardTitle>
              {recipe.category ? (
                <CardDescription>{recipe.category.name}</CardDescription>
              ) : null}
            </div>

            <CardAction>
              {totalMin > 0 ? (
                <span className="translate-y-1 inline-flex items-center rounded-none bg-secondary py-0.5 pl-2 pr-1.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                  {totalMin} min
                </span>
              ) : null}
            </CardAction>
          </CardHeader>

          <CardContent className="flex-1">
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {recipe.description || "No description provided yet."}
            </p>
          </CardContent>
        </Card>
      </Link>

      <div className="absolute right-2 top-2 z-10">
        <RecipeCardMenu recipeSlug={recipe.slug} />
      </div>
    </div>
  );
}

export function RecipeCardSkeleton() {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-none pt-0">
      <div className="relative aspect-video w-full bg-muted">
        <Skeleton className="absolute inset-0 rounded-none" />
      </div>

      <CardHeader>
        <Skeleton className="h-6 w-2/3 rounded-none" />
        <Skeleton className="mt-1 h-4 w-1/3 rounded-none" />
        <CardAction>
          <Skeleton className="h-5 w-12 rounded-none" />
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1 space-y-2">
        <Skeleton className="h-4 w-full rounded-none" />
        <Skeleton className="h-4 w-4/5 rounded-none" />
      </CardContent>
    </Card>
  );
}

export function RecipeCardCreate() {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-none pt-0 transition-all duration-300 ease-in-out hover:bg-primary/3 hover:shadow-sm">
      <div className="relative flex aspect-video w-full items-center justify-center overflow-hidden bg-muted/70">
        <CirclesThreePlusIcon
          className="size-10 text-primary"
          aria-hidden="true"
        />
      </div>

      <CardHeader>
        <div className="flex min-w-0 flex-col gap-1">
          <CardTitle className="text-xl text-primary">New Recipe</CardTitle>
          <CardDescription>Start a fresh draft</CardDescription>
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          Add ingredients, steps, and cook time, then file it into a category.
        </p>
      </CardContent>
    </Card>
  );
}

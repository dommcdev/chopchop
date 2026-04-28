import Image from "next/image";
import Link from "next/link";
import { FileImageIcon } from "@phosphor-icons/react/dist/ssr";
import { CirclesThreePlusIcon } from "@phosphor-icons/react/dist/ssr";
import { RecipeWithCategory } from "@/types";
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

export default function RecipeCard({
  recipe,
  imageLoading = "lazy",
}: {
  recipe: RecipeWithCategory;
  imageLoading?: "eager" | "lazy";
}) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden rounded-none pt-0 transition-all duration-300 ease-in-out hover:bg-muted/40 hover:shadow-sm dark:hover:bg-muted/60 dark:hover:ring-foreground/20 dark:hover:shadow-black/30 will-change-transform">
      <Link
        href={`/dashboard/r/${recipe.slug}`}
        aria-label={`Open recipe ${recipe.name}`}
        className="absolute inset-0 z-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />

      <div className="relative z-10 aspect-video w-full overflow-hidden bg-muted">
        {recipe.imageUrl ? (
          <Image
            src={recipe.imageUrl}
            alt={recipe.name}
            fill
            loading={imageLoading}
            sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <FileImageIcon className="size-10" aria-hidden="true" />
          </div>
        )}
      </div>

      <CardHeader className="relative z-10">
        <div className="flex min-w-0 flex-col gap-1">
          <CardTitle className="line-clamp-1 text-xl">{recipe.name}</CardTitle>
          {recipe.category ? (
            <CardDescription>{recipe.category.name}</CardDescription>
          ) : null}
        </div>

        <CardAction className="-mr-1.5 z-20">
          <RecipeCardMenu recipeSlug={recipe.slug} />
        </CardAction>
      </CardHeader>

      <CardContent className="relative z-10 flex-1">
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {recipe.description || "No description provided yet."}
        </p>
      </CardContent>
    </Card>
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
    <Card className="flex h-full flex-col overflow-hidden rounded-none pt-0 transition-all duration-300 ease-in-out hover:bg-muted/40 hover:shadow-sm dark:hover:bg-muted/60 dark:hover:ring-foreground/20 dark:hover:shadow-black/30 will-change-transform">
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

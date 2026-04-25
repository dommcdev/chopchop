import Image from "next/image";
import Link from "next/link";
import { FileImageIcon } from "@phosphor-icons/react/dist/ssr";
import { RecipeWithCategory } from "@/types";
import { totalCookMinutes } from "@/lib/utils";
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
    <Link
      href={`/dashboard/r/${recipe.slug}`}
      className="group block h-full outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-none pt-0 transition-colors hover:bg-muted/40 hover:shadow-sm">
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
          <CardTitle className="line-clamp-1 text-xl">{recipe.name}</CardTitle>
          {recipe.category ? (
            <CardDescription>{recipe.category.name}</CardDescription>
          ) : null}

          {totalMin > 0 ? (
            <CardAction>
              <span className="translate-y-1 inline-flex items-center rounded-none bg-secondary pl-2 pr-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                {totalMin} min
              </span>
            </CardAction>
          ) : null}
        </CardHeader>

        <CardContent className="flex-1">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {recipe.description || "No description provided yet."}
          </p>
        </CardContent>
      </Card>
    </Link>
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

import Link from "next/link";
import { fetchCategories } from "@/data/categories";
import CategoryCard, {
  CategoryCardCreate,
  CategoryCardSkeleton,
} from "./CategoryCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Suspense } from "react";
import { CreateCategoryDialog } from "./CategoryDialog";

export default async function DashboardCategories() {
  return (
    <div className="m-4 flex flex-col gap-2 md:m-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-semibold tracking-tight">
          Browse Categories
        </h2>
        <Link
          href="/dashboard/c"
          className="text-muted-foreground underline underline-offset-2 transition-colors hover:text-foreground"
        >
          View all categories
        </Link>
      </div>

      <Carousel className="w-full px-12">
        <CarouselContent>
          <CarouselItem className="basis-54">
            <CreateCategoryDialog
              trigger={
                <button type="button" className="w-full p-1 text-left">
                  <CategoryCardCreate />
                </button>
              }
            />
          </CarouselItem>
          <Suspense
            fallback={Array.from({ length: 12 }).map((_, i) => (
              <CarouselItem key={i} className="basis-54">
                <div className="p-1">
                  <CategoryCardSkeleton />
                </div>
              </CarouselItem>
            ))}
          >
            <DashboardCategoriesList />
          </Suspense>
        </CarouselContent>
        <div className="absolute top-1/2 left-0 z-10 -translate-y-1/2">
          <CarouselPrevious className="relative top-0 left-0 translate-x-0 translate-y-0 hover:translate-x-0" />
        </div>
        <div className="absolute top-1/2 right-0 z-10 -translate-y-1/2">
          <CarouselNext className="relative top-0 right-0 translate-x-0 translate-y-0 hover:translate-x-0" />
        </div>
      </Carousel>
    </div>
  );
}

async function DashboardCategoriesList() {
  const allCategories = await fetchCategories();

  if (allCategories.length === 0) return null;

  return (
    <>
      {allCategories.map((category) => (
        <CarouselItem key={category.id} className="basis-54">
          <div className="p-1">
            <CategoryCard category={category} />
          </div>
        </CarouselItem>
      ))}
    </>
  );
}

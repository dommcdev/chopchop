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
import { CreateCategoryDialog } from "./CreateCategoryDialog";

export default async function DashboardCategories() {
  return (
    <div className="m-4 flex flex-col gap-2 md:m-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold">Browse Categories</h2>
        <Link href="/dashboard/c" className="underline">
          View all categories
        </Link>
      </div>

      <div className="px-12">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            <CarouselItem className="pl-2 basis-54">
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
                <CarouselItem key={i} className="pl-2 basis-54">
                  <div className="p-1">
                    <CategoryCardSkeleton />
                  </div>
                </CarouselItem>
              ))}
            >
              <DashboardCategoriesList />
            </Suspense>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}

async function DashboardCategoriesList() {
  const allCategories = await fetchCategories();

  if (allCategories.length === 0) return null;

  return (
    <>
      {allCategories.map((category) => (
        <CarouselItem key={category.id} className="pl-2 basis-54">
          <div className="p-1">
            <CategoryCard category={category} />
          </div>
        </CarouselItem>
      ))}
    </>
  );
}

import Link from "next/link";
import { fetchCategories } from "@/data/categories";
import CategoryCard from "./CategoryCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function DashboardCategories() {
  const allCategories = await fetchCategories();

  return (
    <div className="m-4 flex flex-col gap-2 md:m-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold">Browse Categories</h2>
        <Link href="/dashboard/c" className="underline">
          View all categories
        </Link>
      </div>

      {allCategories.length > 0 ? (
        <div className="px-12">
          <Carousel className="w-full">
            <CarouselContent className="-ml-1">
              {allCategories.map((category) => (
                <CarouselItem key={category.id} className="pl-2 basis-54">
                  <div className="p-1">
                    <CategoryCard category={category} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ) : (
        <p> No categories</p>
        //New category button rendered here
      )}
    </div>
  );
}

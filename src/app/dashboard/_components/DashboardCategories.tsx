import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { fetchCategories } from "@/data/categories";
import { Card, CardContent } from "@/components/ui/card";
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
        <Carousel className="w-full max-w-[12rem] sm:max-w-xs md:max-w-sm">
          <CarouselContent className="-ml-1">
            {Array.from({ length: 20 }).map((_, index) => (
              <CarouselItem key={index} className="basis-1/2 pl-1 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-2xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p> No categories</p>
        //New category button rendered here
      )}
    </div>
  );
}

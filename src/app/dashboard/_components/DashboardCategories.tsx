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
        <div className="px-12">
          <Carousel opts={{ align: "start", loop: true }} className="w-full">
            <CarouselContent className="-ml-1">
              {allCategories.map((category) => (
                <CarouselItem
                  key={category.id}
                  className="pl-2 basis-1/2 sm:basis-1/4 md:basis-1/4 lg:basis-1/6 xl:basis-1/8 2xl:basis-1/10"
                >
                  <div className="p-1">
                    <Card className="shadow">
                      <CardContent className="flex h-32 items-center justify-center p-6">
                        <span className="text-xl font-semibold text-wrap text-center">
                          <Link href={`/dashboard/c/${category.slug}`}>
                            {category.name}
                          </Link>
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
        </div>
      ) : (
        <p> No categories</p>
        //New category button rendered here
      )}
    </div>
  );
}

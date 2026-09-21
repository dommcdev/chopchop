import { Suspense } from "react";
import { FolderSimpleIcon } from "@phosphor-icons/react/dist/ssr";
import { fetchCategories } from "@/data/categories";
import CategoryCard, { CategoryCardSkeleton } from "./CategoryCard";
import { EmptyState } from "./EmptyState";
import { NewCategoryButton } from "./NewCategoryButton";
import { SectionHeader } from "./SectionHeader";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default async function DashboardCategories() {
  return (
    <div className="my-4 flex flex-col gap-2 md:my-6">
      <SectionHeader
        title="Browse Categories"
        viewAllHref="/dashboard/c"
        viewAllLabel="View all"
        action={<NewCategoryButton />}
      />

      <Suspense
        fallback={
          <CategoriesCarousel>
            {Array.from({ length: 12 }).map((_, i) => (
              <CarouselItem key={i} className="basis-54">
                <div className="p-1">
                  <CategoryCardSkeleton />
                </div>
              </CarouselItem>
            ))}
          </CategoriesCarousel>
        }
      >
        <DashboardCategoriesList />
      </Suspense>
    </div>
  );
}

function CategoriesCarousel({ children }: { children: React.ReactNode }) {
  return (
    <Carousel className="w-full px-12">
      <CarouselContent>{children}</CarouselContent>
      <div className="absolute top-1/2 left-0 z-10 -translate-y-1/2">
        <CarouselPrevious className="relative top-0 left-0 translate-x-0 translate-y-0 hover:translate-x-0" />
      </div>
      <div className="absolute top-1/2 right-0 z-10 -translate-y-1/2">
        <CarouselNext className="relative top-0 right-0 translate-x-0 translate-y-0 hover:translate-x-0" />
      </div>
    </Carousel>
  );
}

async function DashboardCategoriesList() {
  const allCategories = await fetchCategories();

  if (allCategories.length === 0) {
    return (
      <EmptyState
        icon={<FolderSimpleIcon weight="duotone" />}
        title="No categories yet"
        description="Categories group your recipes. Make one, then file recipes into it from the editor."
        className="py-10 sm:py-12"
      >
        <NewCategoryButton variant="default" />
      </EmptyState>
    );
  }

  return (
    <CategoriesCarousel>
      {allCategories.map((category) => (
        <CarouselItem key={category.id} className="basis-54">
          <div className="p-1">
            <CategoryCard category={category} />
          </div>
        </CarouselItem>
      ))}
    </CategoriesCarousel>
  );
}

import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import CategoryCard, {
  CategoryCardSkeleton,
} from "@/components/dashboard/CategoryCard";
import ResponsiveGrid from "@/components/dashboard/ResponsiveGrid";
import { fetchCategories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <main className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
      <div className="mb-6 flex flex-col items-start gap-2.5 md:mb-8">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon weight="bold" className="h-4 w-4 shrink-0" />
          Back to Dashboard
        </Link>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          All Categories
        </h1>
      </div>

      <Suspense
        fallback={
          <ResponsiveGrid>
            {Array.from({ length: 12 }).map((_, i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </ResponsiveGrid>
        }
      >
        <ResponsiveGrid>
          <CategoriesList />
        </ResponsiveGrid>
      </Suspense>
    </main>
  );
}

async function CategoriesList() {
  const allCategories = await fetchCategories();

  return (
    <>
      {allCategories.map((category) => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </>
  );
}

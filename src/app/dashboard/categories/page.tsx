import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import CategoriesGrid from "../_components/CategoriesGrid";
import { CategoryCardSkeleton } from "../_components/CategoryCard";

function CategoriesGridSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <CategoryCardSkeleton key={i} />
      ))}
    </div>
  );
}

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

        {/* Bumped the title size up to match the hierarchy of your Recipe pages */}
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          All Categories
        </h1>
      </div>

      <Suspense fallback={<CategoriesGridSkeleton />}>
        <CategoriesGrid />
      </Suspense>
    </main>
  );
}

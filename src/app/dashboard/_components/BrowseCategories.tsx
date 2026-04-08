import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";

export default async function BrowseCategories() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Please sign in to view categories.</div>;
  }

  const allCategories = await db
    .select({
      id: categories.id,
      name: categories.name,
      slug: categories.slug,
    })
    .from(categories)
    .where(eq(categories.userId, userId));

  return (
    <div className="m-4 flex flex-col gap-2 md:m-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold">Browse Categories</h2>
        <Link href="/dashboard/c" className="underline">
          View all categories
        </Link>
      </div>

      <div className="flex w-full flex-nowrap gap-4 overflow-x-auto pb-1 [scrollbar-gutter:stable]">
        {allCategories.length > 0 ? (
          allCategories.map((category) => (
            <div
              key={category.id}
              className="w-[min(100%,calc(100vw-2rem))] shrink-0 sm:w-[calc((100%-1rem)/2)] md:w-[calc((100%-2rem)/3)] lg:w-[calc((100%-3rem)/4)] xl:w-[calc((100%-4rem)/5)]"
            >
              <CategoryCard category={category} />
            </div>
          ))
        ) : (
          <p>No categories found. Create one to get started!</p>
        )}
      </div>
    </div>
  );
}

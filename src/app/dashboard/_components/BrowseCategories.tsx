import BrowseCategoriesCarousel from "./BrowseCategoriesCarousel";
import CategoryCard from "./CategoryCard";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/db";
import { categories } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getCategoriesForUser } from "@/data/categories";

export default async function BrowseCategories() {
  const { userId } = await auth();

  if (!userId) {
    return (
      <div className="m-4 md:m-6 p-6 border-[3px] border-foreground bg-muted text-sm font-bold uppercase">
        Please sign in to view categories.
      </div>
    );
  }

  const allCategories = await getCategoriesForUser(userId);

  return (
    <div className="m-4 flex flex-col gap-2 md:m-6">
      <div className="flex flex-row justify-between items-center">
        <h2 className="text-xl font-bold">Browse Categories</h2>
        <Link href="/dashboard/c" className="underline">
          View all categories
        </Link>
      </div>

      {allCategories.length > 0 ? (
        <BrowseCategoriesCarousel>
          {allCategories.map((category) => (
            <div
              key={category.id}
              className="w-[min(88vw,17.5rem)] shrink-0 snap-start md:w-56"
            >
              <CategoryCard category={category} />
            </div>
          ))}
        </BrowseCategoriesCarousel>
      ) : (
        <p>No categories found. Create one to get started!</p>
      )}
    </div>
  );
}

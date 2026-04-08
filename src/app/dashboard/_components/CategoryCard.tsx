import Link from "next/link";
import { Category } from "@/db/schema";

interface CategoryCardProps {
  // Use Pick to grab only what the UI needs from the DB type
  category: Pick<Category, "name" | "slug">;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/dashboard/c/${category.slug}`}
      className="group block w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
    >
      <div className="category-card flex min-h-[7.5rem] items-center justify-center border-[3px] border-foreground bg-card p-6 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
        <h3 className="line-clamp-3 text-center text-lg font-black uppercase leading-snug tracking-tight text-foreground sm:text-xl">
          {category.name}
        </h3>
      </div>
    </Link>
  );
}

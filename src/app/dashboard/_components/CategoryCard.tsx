import Link from "next/link";
import { Category } from "@/db/schema";

interface CategoryCardProps {
  // Use Pick to grab only what the UI needs from the DB type
  category: Pick<Category, "name" | "slug">;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/dashboard/c/${category.slug}`}>
      <div className="category-card border-[2px] border-foreground rounded-none p-3">
        <h3>{category.name}</h3>
      </div>
    </Link>
  );
}

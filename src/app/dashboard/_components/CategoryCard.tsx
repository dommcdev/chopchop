import Link from "next/link";

interface CategoryCardProps {
  label: string; //name of category from db
  slug: string; //slug of category from db
}

export default function CategoryCard({ slug, label }: CategoryCardProps) {
  return (
    <Link href={`/dashboard/c/${slug}`}>
      <div className="category-card border-2 border-foreground rounded-none p-4">
        <h3>{label}</h3>
      </div>
    </Link>
  );
}

//TODO edit and delete functionality

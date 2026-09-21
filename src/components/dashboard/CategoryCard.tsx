import Link from "next/link";
import { CategoryBrief } from "@/types";
import { CardContent, Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CategoryCardMenu } from "@/components/dashboard/CategoryCardMenu";

export default function CategoryCard({
  category,
}: {
  category: CategoryBrief;
}) {
  return (
    <div className="relative">
      <Link href={`/dashboard/c/${category.slug}`} className="block">
        <Card isHoverable className="shadow-sm">
          <CardContent className="flex h-28 items-center justify-center p-6">
            <span className="text-xl font-semibold text-wrap text-center">
              {category.name}
            </span>
          </CardContent>
        </Card>
      </Link>
      <div className="absolute top-1 right-1 z-10">
        <CategoryCardMenu
          categorySlug={category.slug}
          categoryName={category.name}
        />
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <Card className="shadow-sm">
      <CardContent className="flex h-28 items-center justify-center p-6">
        <Skeleton className="h-7 w-2/3 rounded-none" />
      </CardContent>
    </Card>
  );
}

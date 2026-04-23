import Link from "next/link";
import { CategoryBrief } from "@/types";
import { CardContent, Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CategoryCard({
  category,
}: {
  category: CategoryBrief;
}) {
  return (
    <Card isHoverable className="shadow-sm">
      <CardContent className="flex h-28 items-center justify-center p-6">
        <span className="text-xl font-semibold text-wrap text-center">
          <Link href={`/dashboard/c/${category.slug}`}>{category.name}</Link>
        </span>
      </CardContent>
    </Card>
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

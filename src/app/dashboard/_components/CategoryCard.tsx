import Link from "next/link";
import { CategoryBrief } from "@/types";
import { CardContent, Card } from "@/components/ui/card";

export default function CategoryCard({
  category,
}: {
  category: CategoryBrief;
}) {
  return (
    <Card isHoverable className="shadow">
      <CardContent className="flex h-28 items-center justify-center p-6">
        <span className="text-xl font-semibold text-wrap text-center">
          <Link href={`/dashboard/c/${category.slug}`}>{category.name}</Link>
        </span>
      </CardContent>
    </Card>
  );
}

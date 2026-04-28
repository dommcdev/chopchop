import Link from "next/link";
import { CategoryBrief } from "@/types";
import { CardContent, Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StackPlusIcon } from "@phosphor-icons/react/dist/ssr";

export default function CategoryCard({
  category,
}: {
  category: CategoryBrief;
}) {
  return (
    <Link href={`/dashboard/c/${category.slug}`} className="block">
      <Card isHoverable className="shadow-sm">
        <CardContent className="flex h-28 items-center justify-center p-6">
          <span className="text-xl font-semibold text-wrap text-center">
            {category.name}
          </span>
        </CardContent>
      </Card>
    </Link>
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

export function CategoryCardCreate() {
  return (
    <Card className="text-primary shadow-sm transition-[background-color,color,box-shadow,transform] duration-300 hover:bg-primary/3">
      <CardContent className="flex h-28 flex-col items-center justify-center gap-2 p-6 text-center">
        <StackPlusIcon className="size-8 text-primary" aria-hidden="true" />
        <span className="text-base font-semibold leading-tight">
          Create Category
        </span>
      </CardContent>
    </Card>
  );
}

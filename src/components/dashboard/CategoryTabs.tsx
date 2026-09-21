import Link from "next/link";
import { fetchCategories } from "@/data/categories";
import { ManageCategoriesDialog } from "@/components/dashboard/ManageCategoriesDialog";
import { NewCategoryButton } from "@/components/dashboard/NewCategoryButton";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const tabClassName = "h-8 px-3 text-sm font-medium shadow-none";

function Tab({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "page" : undefined}
      className={cn(
        buttonVariants({ variant: active ? "default" : "outline" }),
        tabClassName,
      )}
    >
      {children}
    </Link>
  );
}

export async function CategoryTabs({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  const [{ c }, categories] = await Promise.all([
    searchParams,
    fetchCategories(),
  ]);
  const activeSlug = categories.some((cat) => cat.slug === c) ? c : undefined;

  return (
    <nav
      aria-label="Filter recipes by category"
      className="flex flex-wrap items-center gap-2"
    >
      <Tab href="/dashboard" active={activeSlug === undefined}>
        All
      </Tab>
      {categories.map((category) => (
        <Tab
          key={category.id}
          href={`/dashboard?c=${encodeURIComponent(category.slug)}`}
          active={category.slug === activeSlug}
        >
          {category.name}
        </Tab>
      ))}
      <NewCategoryButton iconOnly className={cn(tabClassName, "px-2.5")} />
      <ManageCategoriesDialog
        categories={categories}
        activeSlug={activeSlug}
        triggerClassName={cn(tabClassName, "px-2.5")}
      />
    </nav>
  );
}

export function CategoryTabsSkeleton() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Skeleton className="h-8 w-12 rounded-none" />
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-8 w-24 rounded-none" />
      ))}
    </div>
  );
}

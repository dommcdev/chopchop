import Link from "next/link";
import { BookOpenIcon } from "@phosphor-icons/react/dist/ssr";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { UploadRecipeButton } from "@/components/dashboard/UploadRecipeButton";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type RecipesEmptyStateProps = {
  title?: string;
  description?: string;
};

export function RecipesEmptyState({
  title = "No recipes yet",
  description = "Upload a photo or PDF and ChopChop fills in the ingredients and steps, or start with a blank recipe.",
}: RecipesEmptyStateProps) {
  return (
    <EmptyState
      icon={<BookOpenIcon weight="duotone" />}
      title={title}
      description={description}
    >
      <UploadRecipeButton variant="default" alwaysShowLabel />
      <Link
        href="/dashboard/r/new"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "px-4 text-sm font-medium",
        )}
      >
        Start from scratch
      </Link>
    </EmptyState>
  );
}

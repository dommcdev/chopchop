"use client";

import { useRouter } from "next/navigation";
import {
  GearSixIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";
import { CategoryDeleteDialog } from "@/components/CategoryDeleteDialog";
import { RenameCategoryDialog } from "@/components/dashboard/CategoryDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCategoryDelete } from "@/hooks/useCategoryDelete";
import { CategoryBrief } from "@/types";
import { cn } from "@/lib/utils";

type ManageCategoriesDialogProps = {
  categories: CategoryBrief[];
  /** Slug of the category currently selected on the dashboard, if any. */
  activeSlug?: string;
  triggerClassName?: string;
};

export function ManageCategoriesDialog({
  categories,
  activeSlug,
  triggerClassName,
}: ManageCategoriesDialogProps) {
  return (
    <Dialog>
      <DialogTrigger
        render={
          <button
            type="button"
            aria-label="Manage categories"
            title="Manage categories"
            className={cn(
              buttonVariants({ variant: "outline" }),
              triggerClassName,
            )}
          />
        }
      >
        <GearSixIcon weight="bold" className="size-4" aria-hidden="true" />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage categories</DialogTitle>
          <DialogDescription>
            Rename or delete a category. Recipes in a deleted category become
            uncategorized.
          </DialogDescription>
        </DialogHeader>

        {categories.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No categories yet.
          </p>
        ) : (
          <ul className="max-h-[60svh] overflow-y-auto border border-border">
            {categories.map((category) => (
              <CategoryRow
                key={category.id}
                category={category}
                isActive={category.slug === activeSlug}
              />
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CategoryRow({
  category,
  isActive,
}: {
  category: CategoryBrief;
  isActive: boolean;
}) {
  const router = useRouter();
  const { runDelete, isDeleting } = useCategoryDelete(category.slug);

  return (
    <li className="flex items-center justify-between gap-3 border-b border-border px-3 py-1.5 last:border-b-0">
      <span className="min-w-0 truncate text-sm font-medium">
        {category.name}
      </span>
      <span className="flex shrink-0 items-center gap-0.5">
        <RenameCategoryDialog
          categorySlug={category.slug}
          currentName={category.name}
          // Renaming changes the slug; keep the dashboard on this category if it's selected.
          navigateOnSuccess={
            isActive
              ? (slug) => `/dashboard?c=${encodeURIComponent(slug)}`
              : undefined
          }
          trigger={
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-foreground"
              aria-label={`Rename ${category.name}`}
              title="Rename"
            >
              <PencilSimpleIcon weight="bold" />
            </Button>
          }
        />
        <CategoryDeleteDialog
          isDeleting={isDeleting}
          onConfirm={async () => {
            const deleted = await runDelete();

            if (deleted) {
              if (isActive) router.push("/dashboard");
              router.refresh();
            }

            return deleted;
          }}
          trigger={
            <Button
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground hover:text-destructive"
              aria-label={`Delete ${category.name}`}
              title="Delete"
            >
              <TrashIcon weight="bold" />
            </Button>
          }
        />
      </span>
    </li>
  );
}

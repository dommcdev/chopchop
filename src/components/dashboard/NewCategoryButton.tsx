import { PlusIcon, StackPlusIcon } from "@phosphor-icons/react/dist/ssr";
import { CreateCategoryDialog } from "@/components/dashboard/CategoryDialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewCategoryButton({
  variant = "outline",
  className,
  iconOnly = false,
}: {
  variant?: "outline" | "default";
  className?: string;
  /** Render as a compact "+" with the label for screen readers only. */
  iconOnly?: boolean;
}) {
  return (
    <CreateCategoryDialog
      trigger={
        <button
          type="button"
          aria-label={iconOnly ? "New category" : undefined}
          className={cn(
            buttonVariants({ variant }),
            "gap-1.5 px-3 text-sm font-medium shadow-sm",
            className,
          )}
        >
          {iconOnly ? (
            <PlusIcon weight="bold" className="size-4" aria-hidden="true" />
          ) : (
            <>
              <StackPlusIcon
                weight="bold"
                className="size-4"
                aria-hidden="true"
              />
              New category
            </>
          )}
        </button>
      }
    />
  );
}

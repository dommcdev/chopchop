import { StackPlusIcon } from "@phosphor-icons/react/dist/ssr";
import { CreateCategoryDialog } from "@/components/dashboard/CategoryDialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function NewCategoryButton({
  variant = "outline",
  className,
}: {
  variant?: "outline" | "default";
  className?: string;
}) {
  return (
    <CreateCategoryDialog
      trigger={
        <button
          type="button"
          className={cn(
            buttonVariants({ variant }),
            "gap-1.5 px-3 text-sm font-medium shadow-sm",
            className,
          )}
        >
          <StackPlusIcon weight="bold" className="size-4" aria-hidden="true" />
          New category
        </button>
      }
    />
  );
}

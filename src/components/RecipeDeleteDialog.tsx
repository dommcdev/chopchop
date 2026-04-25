"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TrashIcon } from "@phosphor-icons/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRecipe } from "@/data/recipesActions";
import { toast } from "sonner";

type RecipeDeleteDialogProps = {
  recipeSlug: string;
  trigger: React.ReactElement;
  redirectTo?: string | null;
  onDeleted?: () => void;
};

export function RecipeDeleteDialog({
  recipeSlug,
  trigger,
  redirectTo = "/dashboard",
  onDeleted,
}: RecipeDeleteDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteRecipe(recipeSlug);

      if (!result.success) {
        throw new Error(result.error);
      }

      setOpen(false);
      onDeleted?.();

      if (redirectTo) {
        router.push(redirectTo);
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error(message);
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger render={trigger} />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <TrashIcon weight="bold" />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete recipe?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this recipe and remove it from your
            dashboard.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

"use client";

import { type ReactElement, useState } from "react";
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

type RecipeDeleteDialogProps = {
  trigger: ReactElement;
  triggerNativeButton?: boolean;
  isDeleting: boolean;
  onConfirm: () => Promise<boolean>;
};

export function RecipeDeleteDialog({
  trigger,
  triggerNativeButton = true,
  isDeleting,
  onConfirm,
}: RecipeDeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleConfirm = async () => {
    const deleted = await onConfirm();

    if (deleted) {
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger
        render={trigger}
        nativeButton={triggerNativeButton}
      />
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
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

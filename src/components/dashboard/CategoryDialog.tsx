"use client";

import { useState, type FormEvent, type ReactElement } from "react";
import { PencilSimpleIcon, StackPlusIcon } from "@phosphor-icons/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createCategory, renameCategory } from "@/data/categoriesActions";
import type { CategoryBrief } from "@/types";

type CreateCategoryDialogProps = {
  trigger: ReactElement;
  onCreated?: (category: CategoryBrief) => void | Promise<void>;
};

type RenameCategoryDialogProps = {
  trigger?: ReactElement;
  triggerNativeButton?: boolean;
  categorySlug: string;
  currentName: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onRenamed?: (category: { slug: string }) => void | Promise<void>;
};

export function CreateCategoryDialog({
  trigger,
  onCreated,
}: CreateCategoryDialogProps) {
  return (
    <CategoryNameDialog
      trigger={trigger}
      title="Create category"
      description="Add a new category to organize recipes."
      placeholder="e.g. Desserts"
      fieldDescription="Enter a unique name for this category"
      submitLabel="Create category"
      submittingLabel="Creating..."
      submitIcon={<StackPlusIcon data-icon="inline-start" weight="bold" />}
      onSubmit={async (name) => {
        const result = await createCategory(name);
        if (!result.success) throw new Error(result.error);
        return {
          data: result.category,
          toastMessage: "Category created.",
        };
      }}
      onSuccess={onCreated}
    />
  );
}

export function RenameCategoryDialog({
  trigger,
  triggerNativeButton,
  categorySlug,
  currentName,
  open,
  onOpenChange,
  onRenamed,
}: RenameCategoryDialogProps) {
  return (
    <CategoryNameDialog
      trigger={trigger}
      triggerNativeButton={triggerNativeButton}
      title="Rename category"
      description="Give this category a new name."
      placeholder="e.g. Desserts"
      fieldDescription="Enter a new name for this category"
      initialName={currentName}
      submitLabel="Rename"
      submittingLabel="Renaming..."
      submitIcon={<PencilSimpleIcon data-icon="inline-start" weight="bold" />}
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={async (name) => {
        const result = await renameCategory(categorySlug, name);
        if (!result.success) throw new Error(result.error);
        return {
          data: { slug: result.slug },
          toastMessage: "Category renamed.",
        };
      }}
      onSuccess={onRenamed}
    />
  );
}

type CategoryNameDialogProps<TSuccess> = {
  trigger?: ReactElement;
  triggerNativeButton?: boolean;
  title: string;
  description: string;
  placeholder: string;
  fieldDescription: string;
  initialName?: string;
  submitLabel: string;
  submittingLabel: string;
  submitIcon: ReactElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit: (name: string) => Promise<{
    data: TSuccess;
    toastMessage: string;
  }>;
  onSuccess?: (data: TSuccess) => void | Promise<void>;
};

function CategoryNameDialog<TSuccess>({
  trigger,
  triggerNativeButton,
  title,
  description,
  placeholder,
  fieldDescription,
  initialName = "",
  submitLabel,
  submittingLabel,
  submitIcon,
  open: controlledOpen,
  onOpenChange: controlledOnOpenChange,
  onSubmit,
  onSuccess,
}: CategoryNameDialogProps<TSuccess>) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const open = controlledOpen ?? uncontrolledOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isPending) {
      return;
    }

    controlledOnOpenChange?.(nextOpen);

    if (controlledOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }

    if (!nextOpen) {
      setName(initialName);
      setError(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (isPending) {
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const { data, toastMessage } = await onSubmit(name);

      handleOpenChange(false);
      setName(initialName);
      toast.success(toastMessage);
      await onSuccess?.(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";

      console.error(message);
      setError(message);
      toast.error(message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {trigger ? (
        <DialogTrigger render={trigger} nativeButton={triggerNativeButton} />
      ) : null}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <FieldGroup>
            <Field data-invalid={error ? true : undefined}>
              <FieldLabel htmlFor="category-name">Category name</FieldLabel>
              <Input
                id="category-name"
                name="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder={placeholder}
                autoFocus
                disabled={isPending}
                aria-invalid={error ? true : undefined}
              />
              {error ? null : (
                <FieldDescription>{fieldDescription}</FieldDescription>
              )}
              <FieldError aria-live="polite">{error}</FieldError>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => handleOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {submitIcon}
              {isPending ? submittingLabel : submitLabel}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

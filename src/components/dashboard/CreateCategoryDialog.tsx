"use client";

import { useState, type FormEvent, type ReactElement } from "react";
import { useRouter } from "next/navigation";
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

type CreateCategoryDialogProps = {
  trigger: ReactElement;
};

type RenameCategoryDialogProps = {
  trigger: ReactElement;
  categorySlug: string;
  currentName: string;
};

export function CreateCategoryDialog({ trigger }: CreateCategoryDialogProps) {
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
        return { slug: result.slug, toastMessage: "Category created." };
      }}
      navigateOnSuccess={(slug) => `/dashboard/categories/${slug}`}
    />
  );
}

export function RenameCategoryDialog({
  trigger,
  categorySlug,
  currentName,
}: RenameCategoryDialogProps) {
  return (
    <CategoryNameDialog
      trigger={trigger}
      title="Rename category"
      description="Give this category a new name."
      placeholder="e.g. Desserts"
      fieldDescription="Enter a new name for this category"
      initialName={currentName}
      submitLabel="Rename"
      submittingLabel="Renaming..."
      submitIcon={<PencilSimpleIcon data-icon="inline-start" weight="bold" />}
      onSubmit={async (name) => {
        const result = await renameCategory(categorySlug, name);
        if (!result.success) throw new Error(result.error);
        return { slug: result.slug, toastMessage: "Category renamed." };
      }}
    />
  );
}

type CategoryNameDialogProps = {
  trigger: ReactElement;
  title: string;
  description: string;
  placeholder: string;
  fieldDescription: string;
  initialName?: string;
  submitLabel: string;
  submittingLabel: string;
  submitIcon: ReactElement;
  onSubmit: (name: string) => Promise<{ slug: string; toastMessage: string }>;
  navigateOnSuccess?: (slug: string) => string;
};

function CategoryNameDialog({
  trigger,
  title,
  description,
  placeholder,
  fieldDescription,
  initialName = "",
  submitLabel,
  submittingLabel,
  submitIcon,
  onSubmit,
  navigateOnSuccess,
}: CategoryNameDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isPending) {
      return;
    }

    setOpen(nextOpen);

    if (!nextOpen) {
      setName(initialName);
      setError(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isPending) {
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const { slug, toastMessage } = await onSubmit(name);

      setOpen(false);
      setName(initialName);
      toast.success(toastMessage);

      if (navigateOnSuccess) {
        router.push(navigateOnSuccess(slug));
      }

      router.refresh();
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
      <DialogTrigger render={trigger} />
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
              onClick={() => setOpen(false)}
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

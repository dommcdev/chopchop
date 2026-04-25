"use client";

import { useState, type FormEvent, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { StackPlusIcon } from "@phosphor-icons/react";
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
import { createCategory } from "@/data/categoriesActions";

type CreateCategoryDialogProps = {
  trigger: ReactElement;
};

export function CreateCategoryDialog({ trigger }: CreateCategoryDialogProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen && isCreating) {
      return;
    }

    setOpen(nextOpen);

    if (!nextOpen) {
      setName("");
      setError(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isCreating) {
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      const result = await createCategory(name);

      if (!result.success) {
        throw new Error(result.error);
      }

      setOpen(false);
      setName("");
      toast.success("Category created.");
      router.push(`/dashboard/categories/${result.slug}`);
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unknown error occurred";

      console.error(message);
      setError(message);
      toast.error(message);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={trigger} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create category</DialogTitle>
          <DialogDescription>
            Add a new category to organize recipes.
          </DialogDescription>
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
                placeholder="e.g. Desserts"
                autoFocus
                disabled={isCreating}
                aria-invalid={error ? true : undefined}
              />
              {error ? null : (
                <FieldDescription>
                  Enter a unique name for this category
                </FieldDescription>
              )}
              <FieldError aria-live="polite">{error}</FieldError>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              <StackPlusIcon data-icon="inline-start" weight="bold" />
              {isCreating ? "Creating..." : "Create category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

//TODO review code

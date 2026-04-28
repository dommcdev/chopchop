"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DotsThreeVerticalIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";

import { RecipeDeleteDialog } from "@/components/RecipeDeleteDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRecipeDelete } from "@/hooks/useRecipeDelete";

type RecipeCardMenuProps = {
  recipeSlug: string;
};

export function RecipeCardMenu({ recipeSlug }: RecipeCardMenuProps) {
  const router = useRouter();
  const { runDelete, isDeleting } = useRecipeDelete(recipeSlug);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Recipe actions"
            title="Recipe actions"
            onClick={(e) => e.preventDefault()}
          />
        }
      >
        <DotsThreeVerticalIcon weight="bold" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-36">
        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href={`/dashboard/r/${recipeSlug}/edit`} />}
          >
            <PencilSimpleIcon weight="bold" />
            Edit
          </DropdownMenuItem>
          <RecipeDeleteDialog
            triggerNativeButton={false}
            isDeleting={isDeleting}
            onConfirm={async () => {
              const deleted = await runDelete();

              if (deleted) {
                router.refresh();
              }

              return deleted;
            }}
            trigger={
              <DropdownMenuItem variant="destructive" closeOnClick={false}>
                <TrashIcon weight="bold" />
                Delete
              </DropdownMenuItem>
            }
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

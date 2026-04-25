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

type RecipeCardMenuProps = {
  recipeSlug: string;
};

export function RecipeCardMenu({ recipeSlug }: RecipeCardMenuProps) {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="outline"
            size="icon-sm"
            className="border-border/80 bg-card/90 text-foreground shadow-sm backdrop-blur-sm hover:bg-card"
            aria-label="Recipe actions"
            title="Recipe actions"
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
            Rename
          </DropdownMenuItem>
          <RecipeDeleteDialog
            recipeSlug={recipeSlug}
            triggerNativeButton={false}
            redirectTo={null}
            onDeletedAction={() => router.refresh()}
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

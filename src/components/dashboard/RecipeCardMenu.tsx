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
            variant="ghost"
            size="icon-sm"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Recipe actions"
            title="Recipe actions"
          />
        }
      >
        <DotsThreeVerticalIcon weight="bold" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        <DropdownMenuGroup>
          <DropdownMenuItem
            render={<Link href={`/dashboard/r/${recipeSlug}/edit`} />}
          >
            <PencilSimpleIcon weight="bold" />
            Edit
          </DropdownMenuItem>
          <RecipeDeleteDialog
            recipeSlug={recipeSlug}
            redirectTo={null}
            onDeleted={() => router.refresh()}
            trigger={
              <DropdownMenuItem
                variant="destructive"
                onSelect={(event) => event.preventDefault()}
              >
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

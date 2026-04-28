"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DotsThreeVerticalIcon,
  PencilSimpleIcon,
  TrashIcon,
} from "@phosphor-icons/react";

import { CategoryDeleteDialog } from "@/components/CategoryDeleteDialog";
import { RenameCategoryDialog } from "@/components/dashboard/CategoryDialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCategoryDelete } from "@/hooks/useCategoryDelete";

type CategoryCardMenuProps = {
  categorySlug: string;
  categoryName: string;
};

export function CategoryCardMenu({
  categorySlug,
  categoryName,
}: CategoryCardMenuProps) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [shouldOpenRename, setShouldOpenRename] = useState(false);
  const { runDelete, isDeleting } = useCategoryDelete(categorySlug);

  return (
    <>
      <RenameCategoryDialog
        categorySlug={categorySlug}
        currentName={categoryName}
        open={isRenameOpen}
        onOpenChange={setIsRenameOpen}
      />
      <DropdownMenu
        open={menuOpen}
        onOpenChange={(open) => {
          setMenuOpen(open);

          if (open) {
            setShouldOpenRename(false);
          }
        }}
        onOpenChangeComplete={(open) => {
          if (!open && shouldOpenRename) {
            setShouldOpenRename(false);
            setIsRenameOpen(true);
          }
        }}
      >
      <DropdownMenuTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            aria-label="Category actions"
            title="Category actions"
            onClick={(e) => e.preventDefault()}
          />
        }
      >
        <DotsThreeVerticalIcon weight="bold" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-36">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              setShouldOpenRename(true);
              setMenuOpen(false);
            }}
          >
            <PencilSimpleIcon weight="bold" />
            Rename
          </DropdownMenuItem>
          <CategoryDeleteDialog
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
    </>
  );
}

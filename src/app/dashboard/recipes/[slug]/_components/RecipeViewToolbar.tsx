"use client";

import Link from "next/link";
import {
  CopySimple,
  PencilSimple,
  Printer,
  ShareNetwork,
} from "@phosphor-icons/react";
import { toast } from "sonner";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconClassName = cn(
  buttonVariants({ variant: "ghost", size: "icon-sm" }),
  "text-muted-foreground hover:text-foreground",
);

type RecipeViewToolbarProps = {
  recipeSlug: string;
  recipePublicId: string;
};

export function RecipeViewToolbar({
  recipeSlug,
  recipePublicId,
}: RecipeViewToolbarProps) {
  const handleShare = async () => {
    const url = new URL(
      `/dashboard/s/${recipePublicId}`,
      window.location.origin,
    ).toString();

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard", {
        icon: <CopySimple weight="fill" className="text-emerald-600" />,
      });
    } catch {
      toast.error("Could not copy share link");
    }
  };

  return (
    <div
      className="pointer-events-auto flex items-center gap-0.5 rounded-none border border-border/80 bg-card/90 p-0.5 shadow-sm backdrop-blur-sm"
      role="toolbar"
      aria-label="Recipe actions"
    >
      <Link
        href={`/dashboard/r/${recipeSlug}/edit`}
        className={iconClassName}
        aria-label="Edit recipe"
        title="Edit recipe"
      >
        <PencilSimple className="h-4 w-4" weight="bold" />
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-foreground"
        aria-label="Copy share link"
        title="Copy share link"
        onClick={handleShare}
      >
        <ShareNetwork className="h-4 w-4" weight="bold" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-foreground"
        aria-label="Print recipe"
        title="Print recipe"
        onClick={() => window.print()}
      >
        <Printer className="h-4 w-4" weight="bold" />
      </Button>
    </div>
  );
}

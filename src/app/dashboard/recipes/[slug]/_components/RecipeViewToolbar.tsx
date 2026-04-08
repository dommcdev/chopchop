"use client";

import { useState } from "react";
import Link from "next/link";
import { PencilSimple, Printer, ShareNetwork } from "@phosphor-icons/react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconClassName = cn(
  buttonVariants({ variant: "ghost", size: "icon-sm" }),
  "text-muted-foreground hover:text-foreground",
);

type RecipeViewToolbarProps = {
  recipeSlug: string;
};

export function RecipeViewToolbar({ recipeSlug }: RecipeViewToolbarProps) {
  const [shareLabel, setShareLabel] = useState<"Share" | "Copied">("Share");

  const handleShare = async () => {
    const url = `${window.location.origin}/dashboard/r/${recipeSlug}`;
    try {
      await navigator.clipboard.writeText(url);
      setShareLabel("Copied");
      window.setTimeout(() => setShareLabel("Share"), 2000);
    } catch {
      setShareLabel("Share");
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
        aria-label={
          shareLabel === "Copied" ? "Link copied" : "Copy link to recipe"
        }
        title={shareLabel === "Copied" ? "Copied" : "Copy link"}
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

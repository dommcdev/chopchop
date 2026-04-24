"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CopySimpleIcon,
  PencilSimpleIcon,
  PrinterIcon,
  LinkIcon,
} from "@phosphor-icons/react";

import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const iconClassName = cn(
  buttonVariants({ variant: "ghost", size: "icon-sm" }),
  "text-muted-foreground hover:text-foreground",
);

type RecipeViewToolbarProps = {
  recipeSlug: string;
  recipePublicId: string;
  canEdit: boolean;
};

export function RecipeToolbar({
  recipeSlug,
  recipePublicId,
  canEdit,
}: RecipeViewToolbarProps) {
  const [shareNotice, setShareNotice] = useState<"idle" | "copied" | "error">(
    "idle",
  );

  useEffect(() => {
    if (shareNotice === "idle") {
      return;
    }

    const timeout = window.setTimeout(() => {
      setShareNotice("idle");
    }, 2200);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [shareNotice]);

  const handleShare = async () => {
    const url = new URL(
      `/s/${recipePublicId}`,
      window.location.origin,
    ).toString();

    try {
      await navigator.clipboard.writeText(url);
      setShareNotice("copied");
    } catch {
      setShareNotice("error");
    }
  };

  return (
    <div className="relative flex flex-col items-end gap-2">
      <div
        className="pointer-events-auto flex items-center gap-0.5 rounded-none border border-border/80 bg-card/90 p-0.5 shadow-sm backdrop-blur-sm"
        role="toolbar"
        aria-label="Recipe actions"
      >
        {canEdit ? (
          <Link
            href={`/dashboard/r/${recipeSlug}/edit`}
            className={iconClassName}
            aria-label="Edit recipe"
            title="Edit recipe"
          >
            <PencilSimpleIcon className="h-4 w-4" weight="bold" />
          </Link>
        ) : null}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn(
            "transition-colors",
            shareNotice === "copied"
              ? "text-emerald-600 hover:text-emerald-700"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-label={
            shareNotice === "copied" ? "Link copied" : "Copy share link"
          }
          title={shareNotice === "copied" ? "Copied" : "Copy share link"}
          onClick={handleShare}
        >
          <LinkIcon className="h-4 w-4" weight="bold" />
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
          <PrinterIcon className="h-4 w-4" weight="bold" />
        </Button>
      </div>

      {shareNotice !== "idle" ? (
        <div
          className={cn(
            "pointer-events-none absolute right-0 top-full z-10 mt-2 min-w-max rounded-none border bg-card px-3 py-1.5 text-xs font-semibold shadow-sm",
            shareNotice === "copied"
              ? "border-emerald-200 text-emerald-700 dark:border-emerald-900 dark:text-emerald-400"
              : "border-destructive/20 text-destructive",
          )}
          role="status"
          aria-live="polite"
        >
          <span className="inline-flex items-center gap-1.5">
            {shareNotice === "copied" ? (
              <CopySimpleIcon weight="fill" className="h-3.5 w-3.5" />
            ) : (
              <LinkIcon weight="bold" className="h-3.5 w-3.5" />
            )}
            {shareNotice === "copied"
              ? "Link copied!"
              : "Could not copy share link"}
          </span>
        </div>
      ) : null}
    </div>
  );
}

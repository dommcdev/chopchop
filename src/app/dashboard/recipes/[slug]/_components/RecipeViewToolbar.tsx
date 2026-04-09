"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CopySimple,
  PencilSimple,
  Printer,
  ShareNetwork,
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
};

export function RecipeViewToolbar({
  recipeSlug,
  recipePublicId,
}: RecipeViewToolbarProps) {
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const setTemporaryStatus = (status: "copied" | "error") => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current);
    }

    setShareStatus(status);
    timeoutRef.current = window.setTimeout(() => {
      setShareStatus("idle");
      timeoutRef.current = null;
    }, 2200);
  };

  const handleShare = async () => {
    const url = new URL(
      `/dashboard/s/${recipePublicId}`,
      window.location.origin,
    ).toString();

    try {
      await navigator.clipboard.writeText(url);
      setTemporaryStatus("copied");
    } catch {
      setTemporaryStatus("error");
    }
  };

  return (
    <div className="relative flex flex-col items-end gap-2">
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
          className={cn(
            "transition-colors",
            shareStatus === "copied"
              ? "text-emerald-600 hover:text-emerald-700"
              : "text-muted-foreground hover:text-foreground",
          )}
          aria-label={
            shareStatus === "copied" ? "Link copied" : "Copy share link"
          }
          title={shareStatus === "copied" ? "Copied" : "Copy share link"}
          onClick={handleShare}
        >
          {shareStatus === "copied" ? (
            <CopySimple className="h-4 w-4" weight="fill" />
          ) : (
            <ShareNetwork className="h-4 w-4" weight="bold" />
          )}
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

      {shareStatus !== "idle" ? (
        <div
          className={cn(
            "pointer-events-none absolute right-0 top-full z-10 mt-2 min-w-max rounded-none border bg-card px-3 py-1.5 text-xs font-semibold shadow-sm",
            shareStatus === "copied"
              ? "border-emerald-200 text-emerald-700 dark:border-emerald-900 dark:text-emerald-400"
              : "border-destructive/20 text-destructive",
          )}
          role="status"
          aria-live="polite"
        >
          <span className="inline-flex items-center gap-1.5">
            {shareStatus === "copied" ? (
              <CopySimple weight="fill" className="h-3.5 w-3.5" />
            ) : (
              <ShareNetwork weight="bold" className="h-3.5 w-3.5" />
            )}
            {shareStatus === "copied"
              ? "Copied to clipboard"
              : "Could not copy share link"}
          </span>
        </div>
      ) : null}
    </div>
  );
}

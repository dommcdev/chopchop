"use client";

import { cn } from "@/lib/utils";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-border/60 py-2 text-center text-[11px] text-muted-foreground print:hidden",
      )}
    >
      <p>&copy; {year} The ChopChop Team. All rights reserved.</p>
    </footer>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { Printer } from "@phosphor-icons/react";

export function PrintRecipeButton() {
  return (
    <Button
      type="button"
      variant="outline"
      className="inline-flex items-center gap-2 border-[2px] border-foreground rounded-none shadow-[4px_4px_0px_0px_var(--foreground)] font-bold"
      onClick={() => window.print()}
    >
      <Printer size={20} weight="bold" />
      Print recipe
    </Button>
  );
}

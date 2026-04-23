"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { Instruction } from "@/types";

export function RecipeInstructions({
  instructions,
}: {
  instructions: Instruction[];
}) {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <ul className="space-y-5">
      {instructions.map((instruction) => (
        <li key={instruction.id} className="group flex items-center gap-4">
          <Checkbox
            id={`instruction-${instruction.id}`}
            checked={!!checked[instruction.id]}
            onCheckedChange={(c) =>
              setChecked((prev) => ({ ...prev, [instruction.id]: !!c }))
            }
            className="h-4 w-4 shrink-0 rounded-none border-muted-foreground/40 data-[state=checked]:border-primary"
          />
          <label
            htmlFor={`instruction-${instruction.id}`}
            className={cn(
              "cursor-pointer text-sm leading-relaxed transition-all",
              checked[instruction.id]
                ? "line-through text-muted-foreground"
                : "text-foreground",
            )}
          >
            {instruction.text}
          </label>
        </li>
      ))}
    </ul>
  );
}

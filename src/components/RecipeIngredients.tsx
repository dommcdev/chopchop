"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Ingredient } from "@/types";
import { cn } from "@/lib/utils";

export function RecipeIngredients({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  const [checked, setChecked] = useState<Record<string | number, boolean>>({});

  return (
    <ul className="space-y-3">
      {ingredients.map((ingredient) => (
        <li key={ingredient.id} className="group flex items-start gap-3">
          <Checkbox
            id={`ingredient-${ingredient.id}`}
            checked={!!checked[ingredient.id]}
            onCheckedChange={(c) =>
              setChecked((prev) => ({ ...prev, [ingredient.id]: !!c }))
            }
            className="mt-[3px] h-4 w-4 shrink-0 rounded-none border-muted-foreground/40 data-[state=checked]:border-primary"
          />
          <label
            htmlFor={`ingredient-${ingredient.id}`}
            className={cn(
              "cursor-pointer break-words text-sm leading-relaxed transition-all",
              checked[ingredient.id]
                ? "line-through text-muted-foreground opacity-70"
                : "text-foreground",
            )}
          >
            {ingredient.quantity != null && ingredient.unit && (
              <span className="font-medium">
                {ingredient.quantity} {ingredient.unit}{" "}
              </span>
            )}
            <span>{ingredient.name}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}

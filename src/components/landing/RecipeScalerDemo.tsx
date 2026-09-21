"use client";

import { useState } from "react";
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react/dist/ssr";
import { RecipeIngredients } from "@/components/RecipeIngredients";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { calculateScaleFactor, formatMinutes } from "@/lib/utils";
import type { Ingredient } from "@/db/schema";

const BASE_SERVINGS = 8;
const PREP_MINUTES = 10;
const COOK_MINUTES = 30;

const ingredients: Ingredient[] = [
  { id: 1, recipeId: 0, quantity: 300, unit: "g", name: "rolled oats" },
  { id: 2, recipeId: 0, quantity: 100, unit: "g", name: "sliced almonds" },
  { id: 3, recipeId: 0, quantity: 60, unit: "ml", name: "maple syrup" },
  { id: 4, recipeId: 0, quantity: 60, unit: "ml", name: "olive oil" },
  { id: 6, recipeId: 0, quantity: 0.5, unit: "tsp", name: "salt" },
  { id: 7, recipeId: 0, quantity: 80, unit: "g", name: "dried cherries" },
];

function parseTargetServings(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export function RecipeScalerDemo() {
  const [targetServingsInput, setTargetServingsInput] = useState(
    String(BASE_SERVINGS),
  );
  const targetServings =
    parseTargetServings(targetServingsInput) ?? BASE_SERVINGS;
  const scaleFactor = calculateScaleFactor(targetServings, BASE_SERVINGS);
  const isScaled = targetServings !== BASE_SERVINGS;

  function stepTargetServings(step: number) {
    setTargetServingsInput(String(Math.max(1, targetServings + step)));
  }

  return (
    <Card className="gap-0 py-0 shadow-sm">
      <CardHeader className="border-b p-5">
        <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Breakfast
        </span>
        <h2 className="text-2xl font-semibold tracking-tight">
          Maple almond granola
        </h2>
        <p className="text-sm text-muted-foreground">
          Big clusters, not too sweet.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-3 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <span>Servings:</span>
            <InputGroup className="h-7 w-24 bg-background">
              <InputGroupAddon align="inline-start">
                <InputGroupButton
                  aria-label="Decrease servings"
                  size="icon-xs"
                  onClick={() => stepTargetServings(-1)}
                >
                  -
                </InputGroupButton>
              </InputGroupAddon>
              <InputGroupInput
                aria-label="Target servings"
                inputMode="numeric"
                pattern="[0-9]*"
                value={targetServingsInput}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  if (/^\d*$/.test(nextValue)) {
                    setTargetServingsInput(nextValue);
                  }
                }}
                onBlur={() => setTargetServingsInput(String(targetServings))}
                className="px-1 text-center text-sm font-medium text-foreground"
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label="Increase servings"
                  size="icon-xs"
                  onClick={() => stepTargetServings(1)}
                >
                  +
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {isScaled && (
              <Button
                variant="outline"
                size="icon-sm"
                aria-label="Reset servings"
                className="text-foreground"
                onClick={() => setTargetServingsInput(String(BASE_SERVINGS))}
              >
                <ArrowCounterClockwiseIcon className="size-3.5" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span>Prep:</span>
            <span className="text-foreground">
              {formatMinutes(PREP_MINUTES)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>Cook:</span>
            <span className="text-foreground">
              {formatMinutes(COOK_MINUTES)}
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5">
        <h3 className="mb-4 text-lg font-semibold tracking-tight">
          Ingredients
        </h3>
        <RecipeIngredients
          ingredients={ingredients}
          scaleFactor={scaleFactor}
        />
      </CardContent>
    </Card>
  );
}

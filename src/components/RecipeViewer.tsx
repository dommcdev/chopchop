"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowCounterClockwiseIcon,
  FileImageIcon,
} from "@phosphor-icons/react/dist/ssr";
import { PrintableRecipeCard } from "./PrintableRecipeCard";
import { RecipeToolbar } from "./RecipeToolbar";
import { RecipeInstructions } from "./RecipeInstructions";
import { RecipeIngredients } from "./RecipeIngredients";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { calculateScaleFactor, formatMinutes } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { RecipeDetails } from "@/types";

function parseTargetServings(value: string): number | null {
  if (!/^\d+$/.test(value)) return null;

  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

export function RecipeViewer({
  recipe,
  canEdit,
}: {
  recipe: RecipeDetails;
  canEdit: boolean;
}) {
  const baseServings = recipe.servings;
  const hasServings = baseServings != null;
  const [targetServingsInput, setTargetServingsInput] = useState(
    hasServings ? String(baseServings) : "",
  );
  const parsedTargetServings = parseTargetServings(targetServingsInput);
  const targetServings = hasServings
    ? (parsedTargetServings ?? baseServings)
    : null;
  const scaleFactor =
    hasServings && targetServings != null
      ? calculateScaleFactor(targetServings, baseServings)
      : 1;
  const isScaled = hasServings && targetServings !== baseServings;

  function stepTargetServings(step: number) {
    if (!hasServings || targetServings == null) return;
    setTargetServingsInput(String(Math.max(1, targetServings + step)));
  }

  function resetTargetServings() {
    if (!hasServings) return;
    setTargetServingsInput(String(baseServings));
  }

  function normalizeTargetServings() {
    if (!hasServings || targetServings == null) return;
    setTargetServingsInput(String(targetServings));
  }

  return (
    <>
      <div className="print:hidden">
        <Card className="gap-0 py-0 shadow-sm">
          <CardHeader className="border-b p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                {recipe.category && (
                  <span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                    {recipe.category.name}
                  </span>
                )}
                <CardTitle className="mb-2 text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
                  {recipe.name}
                </CardTitle>
                {recipe.description && (
                  <CardDescription className="text-sm md:text-base">
                    {recipe.description}
                  </CardDescription>
                )}
              </div>
              <div className="shrink-0 print:hidden">
                <RecipeToolbar
                  recipeSlug={recipe.slug}
                  recipePublicId={recipe.publicId}
                  canEdit={canEdit}
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
                <span className="inline-flex items-start gap-0.5">
                  <span>Servings: </span>
                </span>
                {hasServings ? (
                  <>
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
                        onBlur={normalizeTargetServings}
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
                        onClick={resetTargetServings}
                      >
                        <ArrowCounterClockwiseIcon className="size-3.5" />
                      </Button>
                    )}
                  </>
                ) : (
                  <Tooltip>
                    <TooltipTrigger
                      aria-label="Add servings value to change recipe scale"
                      className="inline-flex cursor-help items-center justify-center border-0 bg-transparent p-0 text-foreground transition-opacity hover:opacity-80"
                    >
                      n/a
                    </TooltipTrigger>
                    <TooltipContent>
                      Add servings value to change recipe scale
                    </TooltipContent>
                  </Tooltip>
                )}
              </div>
              {recipe.prepTime != null && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <span>Prep:</span>
                  <span className="text-foreground">
                    {formatMinutes(recipe.prepTime)}
                  </span>
                </div>
              )}
              {recipe.cookTime != null && (
                <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
                  <span>Cook:</span>
                  <span className="text-foreground">
                    {formatMinutes(recipe.cookTime)}
                  </span>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="grid border-b px-0 md:grid-cols-2">
            <div className="order-2 p-5 sm:p-6 md:order-1 md:border-r md:border-border">
              <CardTitle className="mb-4 text-lg font-semibold tracking-tight md:text-xl">
                Ingredients
              </CardTitle>
              <RecipeIngredients
                ingredients={recipe.ingredients}
                scaleFactor={scaleFactor}
              />
            </div>

            <div className="relative order-1 min-h-[16rem] w-full overflow-hidden border-b border-border bg-muted md:order-2 md:h-full md:border-b-0">
              {recipe.imageUrl ? (
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full min-h-[16rem] items-center justify-center text-muted-foreground md:min-h-full">
                  <FileImageIcon className="size-12" aria-hidden="true" />
                </div>
              )}
            </div>
          </CardContent>

          <CardContent className="p-5 sm:p-6">
            <CardTitle className="mb-5 text-lg font-semibold tracking-tight md:text-xl">
              Instructions
            </CardTitle>
            <RecipeInstructions instructions={recipe.instructions} />
          </CardContent>
        </Card>
      </div>

      <div className="hidden print:block">
        <PrintableRecipeCard recipe={recipe} targetServings={targetServings} />
      </div>
    </>
  );
}

export function RecipeViewerSkeleton() {
  return (
    <Card className="gap-0 py-0 shadow-sm">
      {/* Header Section: */}
      <CardHeader className="border-b p-5 sm:p-6">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3 w-20" /> {/* Category */}
          <Skeleton className="h-9 w-2/3" /> {/* Title */}
          <Skeleton className="h-5 w-full" /> {/* Description line 1 */}
          <Skeleton className="h-5 w-4/5" /> {/* Description line 2 */}
        </div>
        <div className="mt-6 flex gap-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
      </CardHeader>

      <CardContent className="grid border-b px-0 md:grid-cols-2">
        {/* Ingredients Column */}
        <div className="order-2 p-5 sm:p-6 md:order-1 md:border-r md:border-border">
          <Skeleton className="mb-4 h-7 w-32" />
          <div className="flex flex-col gap-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-5 w-full" />
            ))}
          </div>
        </div>

        {/* Image Column: */}
        <div className="relative order-1 min-h-[16rem] w-full bg-muted md:order-2 md:h-full">
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
        </div>
      </CardContent>

      {/* Instructions Section */}
      <CardContent className="p-5 sm:p-6">
        <Skeleton className="mb-5 h-5 w-32" />
        <div className="flex flex-col gap-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-15 w-full" />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

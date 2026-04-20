"use client";

import { useEffect, useState, use, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { MagnifyingGlassIcon } from "@phosphor-icons/react/dist/ssr";
import { useRouter } from "next/navigation";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { type RecipeSearchItem } from "@/types";

export default function SearchRecipesDialog({
  recipesPromise,
}: {
  recipesPromise: Promise<RecipeSearchItem[]>;
}) {
  const [open, setValue] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setValue((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <Button
        onClick={() => setValue(true)}
        variant="outline"
        className="w-fit items-center gap-2 rounded-none shadow-sm"
      >
        <MagnifyingGlassIcon className="h-4 w-4 shrink-0" weight="bold" />

        <span className="text-sm font-medium">Find Recipe</span>

        {/* Using the semantic <kbd> tag for keyboard shortcuts.
      Styled to match the sharp, high-contrast look of your category badges. */}
        <kbd className="ml-4 inline-flex h-5 items-center rounded-none border border-border bg-muted px-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          Ctrl K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setValue}>
        <Command>
          <CommandInput placeholder="Find a recipe..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <Suspense
              fallback={
                <div className="p-10 text-center animate-pulse">
                  Loading recipes...
                </div>
              }
            >
              <RecipeList
                searchDataPromise={recipesPromise}
                onSelect={(slug) => {
                  router.push(`/dashboard/r/${slug}`);
                  setValue(false);
                }}
              />
            </Suspense>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}

function RecipeList({
  searchDataPromise,
  onSelect,
}: {
  searchDataPromise: Promise<RecipeSearchItem[]>;
  onSelect: (slug: string) => void;
}) {
  const recipes = use(searchDataPromise);

  return (
    <CommandGroup>
      {recipes.map((recipe) => {
        const keywords = [
          recipe.name,
          recipe.category?.name,
          recipe.description,
          recipe.ingredientKeywords,
        ].filter((k): k is string => Boolean(k));

        return (
          <CommandItem
            key={recipe.id}
            value={recipe.slug}
            keywords={keywords}
            onSelect={() => onSelect(recipe.slug)}
          >
            {recipe.name}
          </CommandItem>
        );
      })}
    </CommandGroup>
  );
}

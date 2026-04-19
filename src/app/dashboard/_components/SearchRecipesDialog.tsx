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
        size="sm"
        className="w-fit flex items-center gap-2 px-4 py-2 font-small transition-all hover:bg-accent hover:shadow-md rounded-none border border-border bg-background shadow-sm"
      >
        <MagnifyingGlassIcon className="h-fit shrink-0" weight="bold" />
        Find Recipe <div className="border p-0.4 ml-2 text-xs">Ctrl K</div>
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
          ...recipe.ingredients.map((i) => i.name),
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

"use client";

import { useEffect, useState } from "react";
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
import { type RecipeWithDetails } from "@/types/recipes";

export default function FindRecipes({
  initialRecipes = [],
}: {
  initialRecipes: RecipeWithDetails[];
}) {
  const [open, setValue] = useState(false);
  const [recipes] = useState(initialRecipes);
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
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setValue(true)}
        variant="outline"
        className="w-fit border-2 p-3 border-foreground rounded-none font-bold"
      >
        <MagnifyingGlassIcon className="h-6 w-6 shrink-0" weight="bold" />
        Find Recipe <div className="border-1 p-0.5 ml-2 text-xs">Ctrl K</div>
      </Button>
      <CommandDialog open={open} onOpenChange={setValue}>
        <Command>
          <CommandInput placeholder="Find a recipe..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {recipes.map((recipe) => {
                const keywords = [
                  recipe.name,
                  recipe.categoryName,
                  recipe.description,
                  ...recipe.ingredients.map((ingredient) => ingredient.name),
                ].filter((keyword): keyword is string => Boolean(keyword));

                return (
                  <CommandItem
                    key={recipe.id}
                    value={recipe.slug}
                    keywords={keywords}
                    onSelect={() => {
                      router.push(`/dashboard/r/${recipe.slug}`);
                      setValue(false);
                    }}
                  >
                    {recipe.name}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

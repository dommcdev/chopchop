//TODO
//Need it to be bigger overall
//Add hints - esc for close, #, @
//Add ui for current ingredient/category filters
//Bug still present

"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import {
  fetchSearchData,
  type RecipeWithDetails,
} from "@/app/dashboard/_actions/fetchSearchData";

export default function FindRecipes() {
  const [open, setValue] = useState(false);
  const [recipes, setRecipes] = useState<RecipeWithDetails[]>([]);
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

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSearchData();
        setRecipes(data);
      } catch (error) {
        console.error("Failed to load recipes:", error);
      }
    }
    load();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={() => setValue(true)}
        variant="outline"
        className="w-fit"
      >
        Find Recipes <span className="ml-2 text-xs">⌘K</span>
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

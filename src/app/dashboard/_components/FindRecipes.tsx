//TODO
//Need it to be bigger overall
//Actually get recipe data
//Add hints - esc for close, #, @
//Add ui for current ingredient/category filters

"use client";

import { useState, useEffect } from "react";
import { BellIcon } from "@phosphor-icons/react";
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
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { fetchRecipes } from "@/data/fetchRecipes";

export default function FindRecipes() {
  const [open, setValue] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
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
        const data = await fetchRecipes(); //call our server action
        setRecipes(data);
      } catch (error) {
        console.error("Failed to load recipes:", error);
      } finally {
        setLoading(false);
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
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Recipes">
              {recipes.map((recipe: any) => (
                <CommandItem
                  key={recipe.id}
                  value={recipe.searchValue}
                  onSelect={() => {
                    router.push(`/dashboard/r/${recipe.slug}`);
                    setValue(false);
                  }}
                >
                  {recipe.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}

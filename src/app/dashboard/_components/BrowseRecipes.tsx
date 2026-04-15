"use client";

import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import { fetchRecipesBlock } from "@/data/recipesActions";
import { RecipeWithCategory } from "@/types";
import RecipeCard from "./RecipeCard";

const LOAD_MORE_PAGE_SIZE = 15;

function hasMoreAfterFullBatch(
  items: RecipeWithCategory[],
  requestedBatchSize: number,
) {
  return items.length > 0 && items.length === requestedBatchSize;
}

export default function BrowseRecipes({
  initialItems = [],
  initialBatchSize,
}: {
  initialItems?: RecipeWithCategory[];
  initialBatchSize: number;
}) {
  const [items, setItems] = useState<RecipeWithCategory[]>(initialItems);
  const nextOffsetRef = useRef(initialItems.length);
  const hasMoreRef = useRef(
    hasMoreAfterFullBatch(initialItems, initialBatchSize),
  );
  const loadingRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const { ref } = useInView({
    rootMargin: "200px",
    onChange: (inView) => {
      if (!inView || !hasMoreRef.current || loadingRef.current) return;

      loadingRef.current = true;
      setIsLoading(true);

      void fetchRecipesBlock(LOAD_MORE_PAGE_SIZE, nextOffsetRef.current)
        .then((newRecipes) => {
          loadingRef.current = false;
          setIsLoading(false);

          if (!newRecipes || newRecipes.length === 0) {
            hasMoreRef.current = false;
            return;
          }

          nextOffsetRef.current += newRecipes.length;
          setItems((prev) => [...prev, ...newRecipes]);

          if (newRecipes.length < LOAD_MORE_PAGE_SIZE) {
            hasMoreRef.current = false;
          }
        })
        .catch(() => {
          loadingRef.current = false;
          setIsLoading(false);
        });
    },
  });

  return (
    <>
      <div className="m-4 flex flex-col gap-2 md:m-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">Recent Recipes</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </div>

      <div
        ref={ref}
        className="h-20 col-span-full flex justify-center items-center"
      >
        {isLoading && (
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Loading more recipes...
          </p>
        )}
      </div>
    </>
  );
}

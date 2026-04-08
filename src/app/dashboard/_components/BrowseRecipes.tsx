"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import RecipeCard from "@/app/dashboard/_components/RecipeCard";
import { Recipe } from "@/db/schema";
import { fetchRecipesBlock } from "../_actions/fetchRecipesBlock";

export default function BrowseCategories({
  initialItems = [],
}: {
  initialItems?: Recipe[];
}) {
  const [items, setItems] = useState<Recipe[]>(initialItems);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  useEffect(() => {
    async function loadMore() {
      if (inView && hasMore && !isLoading) {
        setIsLoading(true);

        // Call the SERVER ACTION, not the DAL
        const newRecipes = await fetchRecipesBlock(page);

        if (newRecipes && newRecipes.length > 0) {
          setItems((prev) => [...prev, ...newRecipes]);
          setPage((prev) => prev + 1);
        } else {
          setHasMore(false);
        }
        setIsLoading(false);
      }
    }

    loadMore();
  }, [inView, hasMore, page, isLoading]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {/* Trigger for Intersection Observer */}
      <div
        ref={ref}
        className="h-20 col-span-full flex justify-center items-center"
      >
        {isLoading && (
          <p className="text-sm font-medium text-muted-foreground animate-pulse">
            Fetching more recipes...
          </p>
        )}
        {!hasMore && items.length > 0 && (
          <p className="text-sm text-muted-foreground">
            You've reached the end!
          </p>
        )}
      </div>
    </>
  );
}

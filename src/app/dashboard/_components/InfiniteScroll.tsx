"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchRecipesBlock } from "@/data/recipes";
import RecipeCard from "@/app/dashboard/_components/RecipeCard";
import { Recipe } from "@/db/schema";

export default function InfiniteScroll() {
  const [items, setItems] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { ref, inView } = useInView({
    rootMargin: "200px",
  });

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setIsLoading(true);

      fetchRecipesBlock(page).then((newRecipes) => {
        if (newRecipes && newRecipes.length > 0) {
          // Append the new data to our existing array of data
          setItems((prev) => [...prev, ...newRecipes]);
          setPage((prev) => prev + 1);
        } else {
          setHasMore(false);
        }
        setIsLoading(false);
      });
    }
  }, [inView, hasMore, page, isLoading]);

  return (
    <>
      {items.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}

      <div ref={ref} className="h-10 col-span-full">
        {isLoading && (
          <p className="text-center text-gray-400">Loading more...</p>
        )}
      </div>
    </>
  );
}

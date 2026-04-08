"use client";

import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import RecipeCard from "@/app/dashboard/_components/RecipeCard";
import { Recipe } from "@/db/schema";
import { fetchRecipesBlock } from "@/app/dashboard/_actions/fetchRecipesBlock";

const PAGE_SIZE = 12;

function computeInitialHasMore(items: Recipe[]) {
  return items.length === 0 || items.length === PAGE_SIZE;
}

export default function BrowseRecipes({
  initialItems = [],
}: {
  initialItems?: Recipe[];
}) {
  const [items, setItems] = useState<Recipe[]>(initialItems);
  const pageRef = useRef(initialItems.length > 0 ? 1 : 0);
  const hasMoreRef = useRef(computeInitialHasMore(initialItems));
  const [hasMore, setHasMore] = useState(() =>
    computeInitialHasMore(initialItems),
  );
  const loadingRef = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  const { ref } = useInView({
    rootMargin: "200px",
    onChange: (inView) => {
      if (!inView || !hasMoreRef.current || loadingRef.current) return;

      loadingRef.current = true;
      setIsLoading(true);

      void fetchRecipesBlock(pageRef.current)
        .then((newRecipes) => {
          loadingRef.current = false;
          setIsLoading(false);

          if (!newRecipes || newRecipes.length === 0) {
            hasMoreRef.current = false;
            setHasMore(false);
            return;
          }

          setItems((prev) => [...prev, ...newRecipes]);
          pageRef.current += 1;

          if (newRecipes.length < PAGE_SIZE) {
            hasMoreRef.current = false;
            setHasMore(false);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

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
            You&apos;ve reached the end!
          </p>
        )}
      </div>
    </>
  );
}

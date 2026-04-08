"use client";

import { useRef, useState } from "react";
import { useInView } from "react-intersection-observer";
import RecipeCard, {
  type RecipeCardRecipe,
} from "@/app/dashboard/_components/RecipeCard";
import { fetchRecipesBlock } from "@/app/dashboard/_actions/fetchRecipesBlock";
import Link from "next/link";

const PAGE_SIZE = 12;

function computeInitialHasMore(items: RecipeCardRecipe[]) {
  return items.length === 0 || items.length === PAGE_SIZE;
}

export default function BrowseRecipes({
  initialItems = [],
}: {
  initialItems?: RecipeCardRecipe[];
}) {
  const [items, setItems] = useState<RecipeCardRecipe[]>(initialItems);
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
      <div className="m-4 flex flex-col gap-2 md:m-6">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">Recent Recipes</h2>
          <Link href="/dashboard/r" className="underline">
            View all recipes
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
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
            Fetching more recipes...
          </p>
        )}
      </div>
    </>
  );
}

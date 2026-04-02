"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { fetchRecipesBlock } from "@/app/dashboard/_actions/fetchRecipesBlock";

export default function InfiniteScroll() {
  const [nodes, setNodes] = useState<React.ReactNode[]>([]);
  const [page, setPage] = useState(1); // We start at page 1 (page 0 is loaded by the main page)
  const [hasMore, setHasMore] = useState(true);

  // 'ref' is the invisible div we watch. 'inView' is true when it hits the screen.
  const { ref, inView } = useInView();

  useEffect(() => {
    // If the div is visible AND we have more recipes to load...
    if (inView && hasMore) {
      // Call our Server Action
      fetchRecipesBlock(page).then((newRow) => {
        if (newRow) {
          // Add the new UI chunk to our list
          setNodes((prev) => [...prev, newRow]);
          setPage((prev) => prev + 1);
        } else {
          // Nothing left in the database
          setHasMore(false);
        }
      });
    }
  }, [inView, hasMore, page]);

  return (
    <>
      {/* This renders all the batches we've fetched so far */}
      {nodes}

      {/* The Sentinel: When this div enters the screen, it triggers 'inView' */}
      {hasMore && (
        <div
          ref={ref}
          className="col-span-full py-10 text-center text-gray-400"
        >
          Loading more recipes...
        </div>
      )}
    </>
  );
}

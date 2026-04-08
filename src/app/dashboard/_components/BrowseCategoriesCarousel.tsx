"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BrowseCategoriesCarousel({
  children,
}: {
  children: React.ReactNode;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    setCanScrollLeft(scrollLeft > 1);
    setCanScrollRight(scrollLeft < maxScroll - 1);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateArrows();

    const ro = new ResizeObserver(() => updateArrows());
    ro.observe(el);
    el.addEventListener("scroll", updateArrows, { passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateArrows);
    };
  }, [updateArrows]);

  const scrollByStep = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el || !el.firstElementChild) return;
    const first = el.firstElementChild as HTMLElement;
    const gap = 16;
    const step = first.getBoundingClientRect().width + gap;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="flex items-stretch gap-2">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="hidden shrink-0 self-center md:inline-flex"
        disabled={!canScrollLeft}
        aria-label="Scroll categories left"
        onClick={() => scrollByStep(-1)}
      >
        <CaretLeftIcon className="size-5" aria-hidden />
      </Button>

      <div
        ref={scrollerRef}
        className={cn(
          "flex min-w-0 flex-1 flex-nowrap gap-4 overflow-x-auto overscroll-x-contain pb-1 touch-pan-x",
          "snap-x snap-mandatory",
          "md:[-ms-overflow-style:none] md:[scrollbar-width:none] md:[&::-webkit-scrollbar]:hidden",
        )}
      >
        {children}
      </div>

      <Button
        type="button"
        variant="outline"
        size="icon"
        className="hidden shrink-0 self-center md:inline-flex"
        disabled={!canScrollRight}
        aria-label="Scroll categories right"
        onClick={() => scrollByStep(1)}
      >
        <CaretRightIcon className="size-5" aria-hidden />
      </Button>
    </div>
  );
}

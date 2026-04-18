"use client";

import Link from "next/link";
import { ForkKnifeIcon } from "@phosphor-icons/react";
import { CategoryBrief } from "@/types";

export default function CategoryCard({
  category,
}: {
  category: CategoryBrief;
}) {
  return (
    <Link
      href={`/dashboard/c/${category.slug}`}
      className="group block w-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
    >
      <div className="relative flex min-h-[9rem] flex-col items-center justify-center overflow-hidden border-[3px] border-foreground bg-card p-6 transition-all duration-200 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5">
        <div className="pointer-events-none absolute inset-0 opacity-[0.38] dark:opacity-[0.32]" />
        <div className="relative z-[1] flex flex-col items-center gap-3 text-center">
          <div className="flex size-14 items-center justify-center border border-primary/35 bg-primary/10 text-primary shadow-[2px_2px_0_0_color-mix(in_oklch,var(--foreground)_35%,transparent)]">
            <ForkKnifeIcon size={32} weight="duotone" aria-hidden />
          </div>
          <h3 className="line-clamp-3 text-lg font-black uppercase leading-snug tracking-tight text-foreground sm:text-xl">
            {category.name}
          </h3>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center">
      <Spinner className="size-8 text-primary" />
    </main>
  );
}

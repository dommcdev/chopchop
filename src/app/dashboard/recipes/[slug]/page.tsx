import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { RecipeViewer, RecipeViewerSkeleton } from "./_components/RecipeViewer";
import { Suspense } from "react";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8 xl:max-w-6xl">
      <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon weight="bold" className="h-4 w-4 shrink-0" />
          Back to Dashboard
        </Link>
      </div>

      <Suspense fallback={RecipeViewerSkeleton()}>
        <RecipeViewer slug={slug} />
      </Suspense>
    </div>
  );
}

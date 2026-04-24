import { DashboardLink } from "@/components/dashboard/DashboardLink";
import { RecipeViewer, RecipeViewerSkeleton } from "@/components/RecipeViewer";
import { Suspense } from "react";

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8">
      <div className="print:hidden mb-6 flex flex-wrap items-center justify-between gap-4">
        <DashboardLink />
      </div>

      <Suspense fallback={RecipeViewerSkeleton()}>
        <RecipeViewer slug={slug} />
      </Suspense>
    </div>
  );
}

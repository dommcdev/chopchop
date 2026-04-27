import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ShareLinkError from "@/components/ShareLinkError";
import { RecipeViewer, RecipeViewerSkeleton } from "@/components/RecipeViewer";
import { fetchRecipeDetailsById } from "@/data/recipes";
import { Suspense } from "react";

export default async function ShareRecipePage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;
  const recipePromise = fetchRecipeDetailsById(publicId);
  const { userId } = await auth();
  const redirectUrl = `/s/${publicId}`;

  if (!userId) {
    return <ShareLinkError redirectUrl={redirectUrl} />;
  }

  return (
    <Suspense fallback={<RecipeViewerSkeleton />}>
      <SharedRecipeViewerContent
        recipePromise={recipePromise}
        userId={userId}
      />
    </Suspense>
  );
}

async function SharedRecipeViewerContent({
  recipePromise,
  userId,
}: {
  recipePromise: ReturnType<typeof fetchRecipeDetailsById>;
  userId: string;
}) {
  const recipe = await recipePromise;

  if (!recipe) {
    notFound();
  }

  if (recipe.userId === userId) {
    redirect(`/dashboard/r/${recipe.slug}`);
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:max-w-5xl lg:p-8">
      <RecipeViewer recipe={recipe} canEdit={false} />
    </div>
  );
}

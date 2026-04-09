import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { recipes } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

export default async function ShareRecipePage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;

  const recipe = await db.query.recipes.findFirst({
    columns: {
      slug: true,
    },
    where: eq(recipes.publicId, publicId),
  });

  if (!recipe) {
    notFound();
  }

  const { userId } = await auth();

  if (!userId) {
    return (
      <main className="mx-auto max-w-screen-2xl p-3">
        <h1 className="text-2xl font-bold">
          Please sign in or create an account to view this recipe.
        </h1>
      </main>
    );
  } else {
    redirect(`/dashboard/r/${recipe.slug}`);
  }
}

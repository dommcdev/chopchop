import { auth } from "@clerk/nextjs/server";
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq, or } from "drizzle-orm";

import { db } from "@/db";
import { recipes } from "@/db/schema";

export default async function EditRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { userId } = await auth();
  const { slug } = await params;

  if (!userId) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold">Please sign in</h1>
          <p className="text-muted-foreground">
            You need to be signed in to edit recipes.
          </p>
        </div>
      </div>
    );
  }

  const recipe = await db.query.recipes.findFirst({
    where: and(
      eq(recipes.userId, userId),
      or(eq(recipes.slug, slug), eq(recipes.publicId, slug)),
    ),
  });

  if (!recipe) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl p-4 sm:p-6 lg:p-8">
      <Link
        href={`/dashboard/r/${recipe.slug}`}
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft weight="bold" className="h-4 w-4" />
        Back to recipe
      </Link>

      <h1 className="mt-8 text-3xl font-black tracking-tighter">
        Edit {recipe.name}
      </h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The recipe editor is not available yet.
      </p>
    </div>
  );
}

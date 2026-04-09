import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";

import { db } from "@/db";
import { recipes } from "@/db/schema";

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

  redirect(`/dashboard/r/${recipe.slug}`);
}

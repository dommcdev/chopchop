import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import ShareLinkError from "@/app/share/_components/ShareLinkError";
import { getRecipeSlugFromPublicId } from "@/data/recipes";

export default async function ShareRecipePage({
  params,
}: {
  params: Promise<{ publicId: string }>;
}) {
  const { publicId } = await params;
  const slug = await getRecipeSlugFromPublicId(publicId);
  const { userId } = await auth();
  const redirectUrl = `/dashboard/r/${slug}`;

  if (!slug) {
    notFound();
  }

  if (!userId) {
    return <ShareLinkError redirectUrl={redirectUrl} />;
  } else {
    redirect(redirectUrl);
  }
}

"use client";

import { LinkButton } from "@/components/LinkButton";
import { BackLink } from "@/components/dashboard/BackLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ShareLinkError({
  redirectUrl,
}: {
  redirectUrl: string;
}) {
  const encodedRedirect = encodeURIComponent(redirectUrl);
  const loginHref = `/login?redirect_url=${encodedRedirect}`;

  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-2xl border border-border shadow-sm">
        <CardHeader className="gap-3">
          <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Sign in to view this recipe
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed sm:text-base">
            You have access to this recipe, but will need to sign in or create
            an account to view it.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LinkButton href={loginHref}>Sign In</LinkButton>
        </CardContent>

        <CardFooter>
          <BackLink href="/">Back to home</BackLink>
        </CardFooter>
      </Card>
    </main>
  );
}

"use client";

import { ArrowLeftIcon } from "@phosphor-icons/react";
import Link from "next/link";
import { LinkButton } from "@/app/_components/LinkButton";
import {
  Card,
  CardContent,
  CardDescription,
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
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col justify-center gap-6 p-4 sm:p-6 lg:max-w-xl">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeftIcon weight="bold" className="h-4 w-4" />
        Back to home
      </Link>

      <Card className="rounded-none border border-border shadow-sm">
        <CardHeader className="space-y-2">
          {/* Swapped font-black for font-semibold to match the cleaner aesthetic */}
          <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Sign in to view this recipe
          </CardTitle>
          <CardDescription className="text-sm leading-relaxed sm:text-base">
            You have access to this recipe, but will need to sign in or create
            an account to view it.
          </CardDescription>
        </CardHeader>

        {/* Shadcn CardContent automatically handles the padding and spacing from the header */}
        <CardContent>
          <LinkButton href={loginHref} text="Sign In" />
        </CardContent>
      </Card>
    </div>
  );
}

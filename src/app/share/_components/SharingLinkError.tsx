"use client";

import { ArrowLeft } from "@phosphor-icons/react";
import Link from "next/link";
import { LinkButton } from "@/app/_components/LinkButton";

export default function SharingLinkError() {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-lg flex-col justify-center gap-6 p-4 sm:p-6 lg:max-w-xl">
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft weight="bold" className="h-4 w-4" />
        Back to home
      </Link>

      <div className="rounded-none border-[3px] border-foreground bg-card">
        <div className="space-y-5 p-6 sm:p-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tighter sm:text-3xl">
              Sign in to view this recipe
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              You have access to this recipe, but will need to sign in or create
              an account to view it.
            </p>
          </div>
          <LinkButton href="/login" text="Sign In" />
        </div>
      </div>
    </div>
  );
}

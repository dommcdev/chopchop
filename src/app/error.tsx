"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeftIcon, BreadIcon, FireIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-10 sm:px-6">
      <Card className="w-full max-w-2xl border border-border shadow-sm">
        <CardHeader className="gap-3">
          <div className="flex items-center gap-3 text-primary">
            <div className="flex size-11 items-center justify-center border border-border bg-primary/10">
              <FireIcon weight="duotone" className="size-6" />
            </div>
            <CardTitle className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Oops! Someone left the stove on.
            </CardTitle>
          </div>
          <CardDescription className="max-w-xl text-sm leading-relaxed sm:text-base">
            Our servers are currently undergoing a bit of a
            flambé...unintentionally. We’re not sure what went wrong, but the
            kitchen is a bit of a mess right now.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          <div className="flex items-start gap-3 border border-border bg-muted/40 p-4">
            <BreadIcon className="mt-0.5 size-5 text-muted-foreground" />
            <div className="flex flex-col gap-1">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Error Code
              </p>
              <p className="font-mono text-sm font-semibold">BURNT_TOAST</p>
            </div>
          </div>
        </CardContent>

        <CardFooter className="justify-between gap-3 max-sm:flex-col max-sm:items-start">
          <Button render={<Link href="/" />}>
            <ArrowLeftIcon data-icon="inline-start" weight="bold" />
            Back to Menu
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

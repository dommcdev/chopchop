"use client";

import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function ShareLinkError({
  redirectUrl,
}: {
  redirectUrl: string;
}) {
  const encodedRedirect = encodeURIComponent(redirectUrl);
  const loginHref = `/login?redirect_url=${encodedRedirect}`;

  return (
    <AlertDialog open>
      <AlertDialogContent size="default">
        <AlertDialogHeader>
          <AlertDialogTitle>Sign in to view this recipe</AlertDialogTitle>
          <AlertDialogDescription>
            You have access to this recipe, but will need to sign in or create
            an account to view it.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="">
          <AlertDialogAction
            nativeButton={false}
            render={<Link href={loginHref} />}
          >
            Sign In
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

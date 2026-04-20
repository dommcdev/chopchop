"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Extend the props of the base Button to include href
interface LinkButtonProps
  extends
    React.ComponentPropsWithoutRef<typeof Button>,
    VariantProps<typeof buttonVariants> {
  href: string;
}

export function LinkButton({
  href,
  children,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Button
      {...props}
      // Merge custom <LinkButton> look with any classes passed from the parent
      className={cn(
        "px-6 text-sm font-extrabold uppercase tracking-widest transition-all duration-300 rounded-none",
        className,
      )}
      nativeButton={false}
      render={<Link href={href} />}
    >
      {children}
    </Button>
  );
}

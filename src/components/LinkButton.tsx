import React from "react";
import Link from "next/link";
import { type VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface LinkButtonProps
  extends
    React.ComponentPropsWithoutRef<typeof Link>,
    VariantProps<typeof buttonVariants> {}

export function LinkButton({
  children,
  className,
  variant,
  size,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      {...props}
      className={cn(
        buttonVariants({ variant, size }),
        "px-6 text-sm font-extrabold uppercase tracking-widest transition-all duration-300 rounded-none",
        className,
      )}
    >
      {children}
    </Link>
  );
}

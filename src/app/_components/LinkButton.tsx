"use client";

import Link, { type LinkProps } from "next/link";
import { Button } from "@/components/ui/button";

export function LinkButton({ text, href }: LinkButtonProps) {
  return (
    <Button
      nativeButton={false}
      size="lg"
      className="px-6 text-sm font-extrabold uppercase tracking-widest transition-all duration-300 rounded-none bg-primary text-primary-foreground"
      render={<Link href={href} />}
    >
      {text}
    </Button>
  );
}

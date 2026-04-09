"use client";

import Link, { type LinkProps } from "next/link";
import { Button } from "@/components/ui/button";

type LinkButtonProps = {
  text: string;
  href: LinkProps["href"];
};

export function LinkButton({ text, href }: LinkButtonProps) {
  return (
    <Button
      nativeButton={false}
      size="lg"
      className="px-6 text-sm font-black uppercase tracking-widest hover:-translate-y-[2px] transition-all duration-300 rounded-none bg-primary text-primary-foreground"
      render={<Link href={href} />}
    >
      {text}
    </Button>
  );
}

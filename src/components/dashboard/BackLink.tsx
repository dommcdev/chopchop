import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BackLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
  variant?: "button" | "inline";
}
export function BackLink({
  href,
  className,
  children,
  variant = "button",
}: BackLinkProps) {
  if (variant === "inline") {
    return (
      <Link
        href={href}
        className={cn(
          buttonVariants({ variant: "link", size: "sm" }),
          "h-auto gap-1 px-0 py-0 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground no-underline hover:text-foreground hover:no-underline",
          className,
        )}
      >
        <ArrowLeftIcon weight="bold" className="h-3.5 w-3.5 shrink-0" />
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "outline", size: "sm" }),
        "w-fit gap-1.5 px-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      <ArrowLeftIcon weight="bold" className="h-3.5 w-3.5 shrink-0" />
      {children}
    </Link>
  );
}

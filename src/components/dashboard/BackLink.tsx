import Link from "next/link";
import { ArrowLeftIcon } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/utils";

interface BackLinkProps {
  href: string;
  className?: string;
  children?: React.ReactNode;
}

export function BackLink({ href, className, children }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      <ArrowLeftIcon
        weight="bold"
        className="size-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5"
      />
      {children}
    </Link>
  );
}

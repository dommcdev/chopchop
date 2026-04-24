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
        "inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
        className,
      )}
    >
      <ArrowLeftIcon weight="bold" className="h-4 w-4 shrink-0" />
      {children}
    </Link>
  );
}

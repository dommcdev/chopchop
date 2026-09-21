import Link from "next/link";
import { ArrowRightIcon } from "@phosphor-icons/react/dist/ssr";

type SectionHeaderProps = {
  title: string;
  viewAllHref: string;
  viewAllLabel: string;
  /** The section's one action, rendered on the right. */
  action?: React.ReactNode;
};

export function SectionHeader({
  title,
  viewAllHref,
  viewAllLabel,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-xl font-semibold tracking-tight">{title}</h2>
        <Link
          href={viewAllHref}
          className="group inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {viewAllLabel}
          <ArrowRightIcon
            weight="bold"
            className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </Link>
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

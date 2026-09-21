import { cn } from "@/lib/utils";

type EmptyStateProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  /** Actions, rendered in a row under the description. */
  children?: React.ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  children,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center border border-border/60 px-6 py-14 text-center sm:py-16",
        className,
      )}
    >
      <div className="text-primary [&_svg]:size-8" aria-hidden="true">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      {children ? (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {children}
        </div>
      ) : null}
    </div>
  );
}

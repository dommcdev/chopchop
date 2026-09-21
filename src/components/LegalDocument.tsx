import { framePadding, fullWidthRule } from "@/components/landing/frame";
import { cn } from "@/lib/utils";

type LegalDocumentProps = {
  title: string;
  effectiveDate: string;
  children: React.ReactNode;
};

export function LegalDocument({
  title,
  effectiveDate,
  children,
}: LegalDocumentProps) {
  return (
    <article>
      <header className={cn(fullWidthRule, framePadding, "py-12 lg:py-16")}>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Effective {effectiveDate}
        </p>
      </header>
      <div className={cn(framePadding, "py-12 lg:py-16")}>
        <div className="max-w-2xl space-y-8 text-sm leading-7 sm:text-base sm:leading-8">
          {children}
        </div>
      </div>
    </article>
  );
}

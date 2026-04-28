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
    <section className="bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="border border-border bg-card shadow-sm">
          <div className="border-b border-border px-6 py-8 sm:px-10">
            <h1 className="mt-1 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {title}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">
              Effective Date: {effectiveDate}
            </p>
          </div>
          <div className="px-6 py-8 sm:px-10">
            <div className="space-y-8 text-sm leading-7 text-foreground sm:text-base">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

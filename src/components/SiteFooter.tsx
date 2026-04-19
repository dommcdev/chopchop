import { cn } from "@/lib/utils";

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export function SiteFooter() {
  const year = getCurrentYear();

  return (
    <footer
      className={cn(
        "border-t border-border/60 py-2 text-center text-[11px] text-muted-foreground print:hidden",
      )}
    >
      <p>&copy; {year} The ChopChop Team. All rights reserved.</p>
    </footer>
  );
}

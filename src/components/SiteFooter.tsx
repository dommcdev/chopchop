import Link from "next/link";
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
        "border-t border-border/60 py-3 text-[11px] text-muted-foreground print:hidden",
      )}
    >
      <div className="mx-auto flex max-w-screen-3xl flex-nowrap items-center justify-center gap-3 px-3 text-center whitespace-nowrap md:px-9">
        <p>&copy; {year} The ChopChop Team.</p>
        <nav className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap">
          <Link
            href="/terms-of-service"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Terms of Service
          </Link>
          <span aria-hidden="true" className="text-border">
            /
          </span>
          <Link
            href="/privacy-policy"
            className="underline underline-offset-2 transition-colors hover:text-foreground"
          >
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}

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
      <div className="mx-auto flex max-w-screen-3xl flex-col items-center justify-center gap-1 px-3 text-center md:px-9">
        <p>&copy; {year} The ChopChop Team. All rights reserved.</p>
        <nav className="flex items-center gap-3">
          <Link
            href="/terms-of-service"
            className="underline underline-offset-2"
          >
            Terms of Service
          </Link>
          <span aria-hidden="true">|</span>
          <Link href="/privacy-policy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}

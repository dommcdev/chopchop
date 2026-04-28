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
          <Link href="/tos" className="underline underline-offset-2">
            Terms of Service
          </Link>
          <span aria-hidden="true">&bull;</span>
          <Link href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </Link>
        </nav>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border/60">
      <nav className="mx-auto flex max-w-6xl items-center justify-between border-border/60 px-4 py-3 sm:border-x sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo />
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggleButton />
        </div>
      </nav>
    </header>
  );
}

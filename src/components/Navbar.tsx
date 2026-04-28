import Link from "next/link";
import CustomUserButton from "@/components/CustomUserButton";
import { Logo } from "@/components/Logo";
import { Show } from "@clerk/nextjs";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border/60">
      <nav className="mx-auto flex max-w-screen-3xl items-center justify-between px-3 py-3 md:px-9">
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

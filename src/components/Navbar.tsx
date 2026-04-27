import Link from "next/link";
import CustomUserButton from "@/components/CustomUserButton";
import { Logo } from "@/components/Logo";
import { Show } from "@clerk/nextjs";
import { ThemeToggleButton } from "@/components/ThemeToggleButton";
import { LinkButton } from "@/components/LinkButton";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm border-b border-foreground/5">
      <nav className="mx-auto flex max-w-screen-3xl items-center justify-between px-3 py-3 md:px-9">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <ThemeToggleButton />
          <Show when="signed-out">
            <LinkButton href="/login">Sign in</LinkButton>
          </Show>
          <Show when="signed-in">
            <LinkButton className="border border-primary" href="/dashboard">
              Dashboard
            </LinkButton>
            <CustomUserButton />
          </Show>
        </div>
      </nav>
    </header>
  );
}

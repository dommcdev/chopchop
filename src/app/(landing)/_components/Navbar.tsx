import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Show } from "@clerk/nextjs";
import { LinkButton } from "@/app//_components/LinkButton";
import { ThemeToggleButton } from "@/app/(landing)/_components/ThemeToggleButton";
import CustomUserButton from "@/app/_components/CustomUserButton";
import { Logo } from "@/components/Logo";

export function Navbar() {
  return (
    <header className="w-full max-w-[90rem] mx-auto px-4 pt-4 sm:px-6 sm:pt-6 lg:px-8 lg:pt-8">
      <nav className="border-[3px] border-foreground flex items-center justify-between bg-background px-4 py-2">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <ThemeToggleButton />
          <Suspense fallback={null}>
            <Show when="signed-out">
              <LinkButton href="/login" text="Sign In" />
            </Show>
          </Suspense>
          <Suspense fallback={null}>
            <Show when="signed-in">
              <LinkButton href="/dashboard" text="Dashboard" />
              <CustomUserButton />
            </Show>
          </Suspense>
        </div>
      </nav>
    </header>
  );
}

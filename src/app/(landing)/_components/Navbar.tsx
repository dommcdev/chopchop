import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Show } from "@clerk/nextjs";
import { LinkButton } from "@/app/(landing)/_components/LinkButton";
import { ThemeToggleButton } from "@/app/(landing)/_components/ThemeToggleButton";
import CustomUserButton from "@/app/_components/CustomUserButton";

export function Navbar() {
  return (
    <nav className="border-b-[3px] border-foreground relative z-50 flex items-center justify-between bg-background px-4 py-3 dark:bg-[oklch(0.18_0_0)] sm:px-6 lg:px-8">
      <Link href="/" className="flex items-center gap-3 group">
        <Image
          src="/logo.svg"
          alt="ChopChop Logo"
          width={840}
          height={329}
          priority
          className="h-8 w-auto bg-background dark:bg-[oklch(0.18_0_0)]"
        />
        <span className="text-2xl font-black uppercase tracking-tighter text-foreground drop-shadow-[2px_2px_0px_var(--primary)] hidden sm:block mt-1"></span>
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
  );
}

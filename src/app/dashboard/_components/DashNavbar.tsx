import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Show, UserButton } from "@clerk/nextjs";
import { ThemeToggleButton } from "@/app/(landing)/_components/ThemeToggleButton";
import SearchBar from "@/app/dashboard/_components/SearchBar";

export function DashNavbar() {
  return (
    <nav className="border-b-[3px] border-foreground relative z-50 flex items-center justify-between bg-background px-4 py-3 dark:bg-[oklch(0.18_0_0)] sm:px-6 lg:px-8">
      <Link href="/dashboard" className="flex items-center gap-3 group">
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
        <SearchBar />
        <ThemeToggleButton />
        <Suspense>
          <Show when="signed-in">
            <div className="border-[3px] border-foreground rounded-full h-8 w-8 flex items-center justify-center bg-card">
              <UserButton />
            </div>
          </Show>
        </Suspense>
      </div>
    </nav>
  );
}

import Link from "next/link";
import Image from "next/image";
import FindRecipes from "@/app/dashboard/_components/FindRecipes";
import CustomUserButton from "@/app/_components/CustomUserButton";

export function DashNavbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between bg-background px-4 py-3 dark:bg-[oklch(0.18_0_0)] sm:px-6 lg:px-8 print:hidden">
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
        <FindRecipes />
        <CustomUserButton />
      </div>
    </nav>
  );
}

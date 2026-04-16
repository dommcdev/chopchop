import Link from "next/link";
import CustomUserButton from "@/app/_components/CustomUserButton";
import SearchBox from "@/app/dashboard/_components/SearchBox";
import { Logo } from "@/components/Logo";

export function DashNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background shadow-sm border-b border-foreground/5 print:hidden">
      <nav className="mx-auto flex max-w-screen-2xl items-center justify-between px-3 py-2 md:px-9">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <SearchBox />
          <CustomUserButton />
        </div>
      </nav>
    </header>
  );
}

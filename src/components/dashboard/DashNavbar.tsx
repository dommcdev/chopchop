import Link from "next/link";
import CustomUserButton from "@/components/CustomUserButton";
import SearchMounter from "@/components/dashboard/SearchMounter";
import { Logo } from "@/components/Logo";
import { UploadRecipeButton } from "@/components/dashboard/UploadRecipeButton";

export function DashNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border/60 print:hidden">
      <nav className="mx-auto flex max-w-screen-3xl items-center justify-between px-3 py-3 md:px-9">
        <Link href="/" className="flex items-center gap-3 group">
          <Logo />
        </Link>
        <div className="flex items-center gap-4 sm:gap-6">
          <SearchMounter />
          <UploadRecipeButton />
          <CustomUserButton />
        </div>
      </nav>
    </header>
  );
}

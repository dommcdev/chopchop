import Link from "next/link";
import CustomUserButton from "@/components/CustomUserButton";
import SearchMounter from "@/components/dashboard/SearchMounter";
import { Logo } from "@/components/Logo";
import { UploadRecipeButton } from "@/components/dashboard/UploadRecipeButton";

export function DashNavbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border/60 print:hidden">
      {/* Transparent side borders keep the logo at the same x as the framed landing Navbar. */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between border-transparent px-4 py-3 sm:border-x sm:px-6 lg:px-8">
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

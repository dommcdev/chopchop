import { Navbar } from "@/components/Navbar";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-svh flex-col overflow-x-clip">
      <Navbar />
      <div className="mx-auto w-full max-w-6xl flex-1 border-border/60 sm:border-x">
        {children}
      </div>
    </div>
  );
}

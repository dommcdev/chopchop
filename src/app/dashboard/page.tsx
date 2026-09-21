import DashboardRecipes from "@/components/dashboard/DashboardRecipes";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ c?: string }>;
}) {
  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <DashboardRecipes searchParams={searchParams} />
    </main>
  );
}

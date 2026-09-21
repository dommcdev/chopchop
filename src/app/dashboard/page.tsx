import DashboardCategories from "@/components/dashboard/DashboardCategories";
import DashboardRecipes from "@/components/dashboard/DashboardRecipes";

export default async function DashboardPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-3 sm:px-6 lg:px-8">
      <DashboardCategories />
      <DashboardRecipes />
    </main>
  );
}

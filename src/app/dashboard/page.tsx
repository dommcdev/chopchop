import DashboardCategories from "@/components/dashboard/DashboardCategories";
import DashboardRecipes from "@/components/dashboard/DashboardRecipes";

export default async function DashboardPage() {
  return (
    <main className="mx-auto max-w-screen-3xl p-3">
      <DashboardCategories />
      <DashboardRecipes />
    </main>
  );
}

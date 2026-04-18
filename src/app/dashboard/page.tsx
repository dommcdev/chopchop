import BrowseCategories from "@/app/dashboard/_components/BrowseCategories";
import RecentDashboardRecipes from "./_components/RecentDashboardRecipes";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <main className="mx-auto max-w-screen-3xl p-3">
      <BrowseCategories />
      <RecentDashboardRecipes />
    </main>
  );
}

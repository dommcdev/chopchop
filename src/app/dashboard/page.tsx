import DashboardCategories from "@/app/dashboard/_components/DashboardCategories";
import DashboardRecipes from "./_components/DashboardRecipes";
import { Suspense } from "react";

export default async function DashboardPage() {
  return (
    <main className="mx-auto max-w-screen-3xl p-3">
      <DashboardCategories />
      <DashboardRecipes />
    </main>
  );
}

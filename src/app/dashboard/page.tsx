import BrowseCategories from "@/app/dashboard/_components/BrowseCategories";
import { FillDatabaseButton } from "@/app/dashboard/_components/FillDatabaseButton";
import RecipeSearch from "@/app/dashboard/_components/RecipeSearch";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <RecipeSearch />
      <div className="flex justify-end">
        <FillDatabaseButton />
      </div>
      <BrowseCategories />
    </div>
  );
}

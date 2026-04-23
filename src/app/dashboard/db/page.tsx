import { FillDatabaseButton2 } from "@/components/dashboard/FillDatabaseButton2";
import { FillDatabaseButton } from "@/components/dashboard/FillDatabaseButton";

export default function DashboardDBPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Database Management</h1>
      <FillDatabaseButton />
      <FillDatabaseButton2 />
    </div>
  );
}

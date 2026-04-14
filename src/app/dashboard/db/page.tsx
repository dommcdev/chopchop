import { FillDatabaseButton2 } from "../_components/FillDatabaseButton2";
import { FillDatabaseButton } from "../_components/FillDatabaseButton";

export default function DashboardDBPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Database Management</h1>
      <FillDatabaseButton />
      <FillDatabaseButton2 />
    </div>
  );
}

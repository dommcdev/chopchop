"use client";

import { type ReactElement } from "react";
import { useRouter } from "next/navigation";

import { CreateCategoryDialog } from "@/components/dashboard/CategoryDialog";

type DashboardCreateCategoryDialogProps = {
  trigger: ReactElement;
};

export function DashboardCreateCategoryDialog({
  trigger,
}: DashboardCreateCategoryDialogProps) {
  const router = useRouter();

  return (
    <CreateCategoryDialog
      trigger={trigger}
      onCreated={() => router.refresh()}
    />
  );
}

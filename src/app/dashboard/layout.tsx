import { DashNavbar } from "@/components/dashboard/DashNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard - ChopChop",
  description: "The Digital Cookbook",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashNavbar />
      <div>{children}</div>
    </div>
  );
}

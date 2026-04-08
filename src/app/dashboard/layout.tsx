import { DashNavbar } from "@/app/dashboard/_components/DashNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ChopChop | Dashboard",
  description: "The Digital Cookbook",
};

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <DashNavbar />
      <main>{children}</main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardUploadButton() {
  return (
    <Button
      nativeButton={false}
      size="lg"
      className="px-6 text-sm"
      render={<Link href="/dashboard/uploader" />}
    >
      Go to upload page
    </Button>
  );
}

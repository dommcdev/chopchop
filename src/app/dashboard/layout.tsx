import { Suspense } from "react";
import { connection } from "next/server";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "@/app/api/uploadthing/core";

async function DashboardUTSSR() {
  await connection();

  return <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />;
}

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={null}>
        <DashboardUTSSR />
      </Suspense>
      {children}
    </>
  );
}

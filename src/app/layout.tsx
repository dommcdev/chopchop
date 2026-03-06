import { Suspense } from "react";
import { connection } from "next/server";
import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChopChop!",
  description: "The Digital Cookbook",
};

async function UTSSR() {
  await connection();

  return <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <nav className="flex items-center justify-between border-b border-border/60 bg-card/70 p-4 backdrop-blur">
            <Link href="/" className="font-semibold tracking-tight">
              ChopChop
            </Link>
            <Suspense fallback={<div className="h-8 w-32" />}>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </Suspense>
          </nav>
          {children}
          <Suspense fallback={null}>
            <UTSSR />
          </Suspense>
        </body>
      </html>
    </ClerkProvider>
  );
}

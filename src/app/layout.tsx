import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { SiteFooter } from "@/components/site-footer";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Suspense } from "react";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChopChop!",
  description: "The Digital Cookbook",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased font-sans",
        fontMono.variable,
        "font-sans",
        geist.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <ClerkProvider appearance={{ theme: shadcn }}>
            <div className="flex min-h-screen flex-col">
              <div className="flex-1">{children}</div>
              <Suspense>
                <SiteFooter />
              </Suspense>
            </div>
            <Toaster richColors />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

//Notes
//TODO ClerkProvider might need to be wrapped in a suspense boundary

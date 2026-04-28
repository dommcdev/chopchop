import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { SiteFooter } from "@/components/SiteFooter";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChopChop",
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
            <TooltipProvider>
              <div className="flex min-h-screen flex-col">
                <main className="flex-1">{children}</main>
                <Toaster richColors duration={3000} />
                <SiteFooter />
              </div>
            </TooltipProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

//Nota bene - <ThemeProvider> needs to be wraped in suspense/loading.tsx

import type { Metadata } from "next";
import "./globals.css";
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";
import { Geist } from "next/font/google";
import { cn } from "@/shared/lib/utils";
import { ThemeProvider } from "@/shared/components/ui/theme-provider";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { Toaster } from "sonner";
import { ourFileRouter } from "./api/uploadthing/core";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "Miausster class",
  description: "Miausster class",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full antialiased", "font-sans", geist.variable)}
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <NextSSRPlugin
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            {children}
            <Toaster
              richColors
              position="bottom-right"
            />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

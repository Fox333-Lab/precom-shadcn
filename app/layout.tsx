import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/themeprovider";
import { Button } from "@/components/ui/button";
import { MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { ThemeToggle } from "@/components/shared/themetoggle";

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const { setTheme } = useTheme();
  return (
    <html lang="en" suppressHydrationWarning>
      {/* <body className={inter.className}>{children}</body> */}
      <body className="">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <ThemeToggle /> */}
          {/* <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16"> */}
          {children}
          {/* </div> */}
        </ThemeProvider>
      </body>
    </html>
  );
}

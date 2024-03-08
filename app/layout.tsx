import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/providers/themeprovider";
import { Footer } from "@/components/shared/users";
import AuthProvider from "@/components/providers/authprovider";
import StateProvider from "@/components/providers/stateprovider";

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
      <body className="antialiased">
        <StateProvider>
          <AuthProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {/* <ThemeToggle /> */}
              {/* <div className="mx-auto max-w-[1920px] px-4 md:px-8 2xl:px-16"> */}
              <div className="flex flex-col min-h-screen">
                <main
                  className="relative grow"
                  style={{ minHeight: "-webkit-fill-available" }}
                >
                  <div className="">{children}</div>
                  {/* <div className="container md:px-8 2xl:px-16">{children}</div>    */}
                  {/* commented above */}
                </main>
              </div>
              {/* </div> */}
              <Footer />
            </ThemeProvider>
          </AuthProvider>
        </StateProvider>
      </body>
    </html>
  );
}

"use client";
import { Sidebar } from "@/components/admin";
import Header from "@/components/admin/dashboard/header";
// import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useState } from "react";
// const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: "Admin Dashboard",
//   description: "Generated by create next app",
// };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="dark:bg-boxdark-2 dark:text-bodydark bg-whiten text-body text-base">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden ">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* <!-- ===== Header End ===== --> */}
            {/* <!-- ===== Main Content Start ===== --> */}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </>
  );
}

// export default function DashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <section className="flex flex-col min-h-screen">
//       <Sidebar />
//       <main
//         className="relative grow"
//         style={{ minHeight: "-webkit-fill-available" }}
//       >
//         <div className="w-full mx-auto">{children}</div>
//       </main>
//     </section>
//   );
// }

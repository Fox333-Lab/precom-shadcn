import AdminLayout from "@/components/admin/dashboard/layout";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./subcat.css";
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "PrecomX - Admin Dashboard",
  description: "App management admin dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AdminLayout>{children}</AdminLayout>
      {/*<div className="dark:bg-boxdark-2 dark:text-bodydark bg-whiten text-body text-base">
        {/* <!-- ===== Page Wrapper Start ===== --> * /}
        <div className="flex h-screen overflow-hidden ">
          {/* <!-- ===== Sidebar Start ===== --> * /}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

      {/* <!-- ===== Content Area Start ===== --> * /}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> * /}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* <!-- ===== Header End ===== --> * /}
            {/* <!-- ===== Main Content Start ===== --> * /}
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> * /}
          </div>
          {/* <!-- ===== Content Area End ===== --> * /}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> * /}
  </div>*/}
    </>
  );
}

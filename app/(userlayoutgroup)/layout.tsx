import AdminLayout from "@/components/admin/dashboard/layout";
import { UserLayout } from "@/components/shared/layouts";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./subcat.css";
// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "PrecomX - Admin Dashboard",
  description: "App management admin dashboard",
};

export default function ULayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <UserLayout>{children}</UserLayout>
    </>
  );
}

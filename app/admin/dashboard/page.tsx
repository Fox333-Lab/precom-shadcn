import { RecentOrders } from "@/components/admin/dashboard/orders";
import { HeaderCards } from "@/components/admin/dashboard/overview";
import { RecentUsers } from "@/components/admin/dashboard/users";

export default function Dashboard() {
  return (
    // <div className="flex flex-col min-h-screen">
    //   <main
    //     className="relative grow"
    //     style={{ minHeight: "-webkit-fill-available" }}
    //   >
    //     <div className="container md:px-8 2xl:px-16">
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-6">
        <HeaderCards />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
          <div>
            <RecentUsers />
          </div>
        </div>
      </div>
    </div>
    //     </div>
    //   </main>
    // </div>
    // comment for commit
  );
}

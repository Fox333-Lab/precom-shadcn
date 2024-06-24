"use client";
import { H3 } from "@/components/ui/textui";
import UserOrders from "@/components/user/dashboard/orders";
import { useSession } from "next-auth/react";

const CustomerOrdersPage = () => {
  const { data: session, status } = useSession();
  console.log("first session", session);
  const userid = session?.user?.uid || "";
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>Order List</H3>
        {/* <Separator /> */}
      </div>
      <UserOrders userid={userid} />
    </div>
  );
};

export default CustomerOrdersPage;

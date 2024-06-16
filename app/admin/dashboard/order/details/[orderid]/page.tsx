import { Details } from "@/components/admin/dashboard/orders";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/textui";
import React from "react";

const OrderDetailsPage = ({ params }: { params: { orderid: string } }) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>Order Details</H3>
        <Separator />
      </div>
      <Details orderid={params.orderid} />
    </div>
  );
};

export default OrderDetailsPage;

import { Orders } from "@/components/admin/dashboard/orders";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/textui";

const OrderListPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>Order List</H3>
        {/* <Separator /> */}
      </div>
      <Orders />
    </div>
  );
};

export default OrderListPage;

"use client";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { StatusCard, StatusCardSkeleton } from ".";
import IOrder from "@/types/db/order";
import { sorders } from "@/data/MOCK_DATA_ORDERS";

const TotalEarningsCard = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/user/order/getallorders`
  );
  if (isLoading) return <StatusCardSkeleton />;
  if (error) return <div>error</div>;
  const totalEarn = data?.orders?.reduce(
    (acc: any, order: IOrder) => acc + order.total,
    0
  );
  let te = sorders.reduce(
    (acc: any, order: any) => acc + Number(order.total),
    0
  );
  te = te.toFixed(2);
  let tup = sorders
    .filter((o: any) => !o.isPaid)
    .reduce((acc: any, order: any) => acc + Number(order.total), 0);
  const totalUnpaid = data?.orders
    ?.filter((o: IOrder) => !o.isPaid)
    .reduce((acc: any, order: IOrder) => acc + order.total, 0);

  return (
    <div className="flex-1">
      <StatusCard
        className=""
        label="Total Revenue"
        value={tup.toString()}
        //value={data?.orders?.length.toString()}
        description={`${tup}/- Unpaid`}
        icon="notebook-text"
      />
    </div>
  );
};

export default TotalEarningsCard;

"use client";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { StatusCard, StatusCardSkeleton } from ".";

const OrderCountCard = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/user/order/getallorders`
  );
  if (isLoading) return <StatusCardSkeleton />;
  if (error) return <div>error</div>;
  return (
    <div className="flex-1">
      <StatusCard
        className=""
        label="Total Orders"
        value={data?.orders?.length.toString()}
        description="Sample description"
        icon="notebook-text"
      />
    </div>
  );
};

export default OrderCountCard;

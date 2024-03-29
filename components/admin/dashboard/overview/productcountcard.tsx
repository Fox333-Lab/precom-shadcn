"use client";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { StatusCard, StatusCardSkeleton } from ".";

const ProductCountCard = () => {
  const { data, error, isLoading } = useSWRFetch(`/api/products`);
  if (isLoading) return <StatusCardSkeleton />;
  if (error) return <div>error</div>;
  return (
    <div className="flex-1">
      <StatusCard
        className=""
        label="Total Products"
        value={data?.products?.length.toString()}
        description="Sample description"
        icon="boxes"
      />
    </div>
  );
};

export default ProductCountCard;

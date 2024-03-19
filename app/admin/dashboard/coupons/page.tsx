"use client";
import { Coupons } from "@/components/admin/dashboard/coupons";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/textui";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import React from "react";

const CouponsPage = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/coupons`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  console.log("coupons page : ", data.coupons);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>Create a coupon</H3>
        <Separator />
      </div>
      <Coupons coupons={data.coupons} />
    </div>
  );
};

export default CouponsPage;

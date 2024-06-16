"use client";
import {
  RecentOrderColumnDefs,
  RecentOrderColumnSkeletonDefs,
} from "@/columndefs/order";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/ui/datatable";
import { sorders } from "@/data/MOCK_DATA_ORDERS";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { TOrder } from "@/types/db/order";
import React from "react";
import { ViewAllLink } from "../..";

const RecentOrders = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/order/limit?limit=10`
  );
  const mockOrders = new Array(5).fill(sorders[0]);
  if (isLoading)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>Recent Orders</div>
            <ViewAllLink url="/admin/dashboard/order/list" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={RecentOrderColumnSkeletonDefs}
            data={mockOrders}
            filterBy="status"
            hideFilter={true}
            hidePagination={true}
            hideViewOptions={true}
          />
        </CardContent>
      </Card>
    );
  if (error) return <div>error</div>;
  //const porders = data?.orders as unknown as TOrder[];
  const porders = sorders.slice(15) as unknown as TOrder[];
  // console.log("po : ", mockOrders);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>Recent Orders</div>
          <ViewAllLink url="/admin/dashboard/order/list" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={
            porders ? RecentOrderColumnDefs : RecentOrderColumnSkeletonDefs
          }
          data={porders ? porders : mockOrders}
          filterBy="status"
          hideFilter={true}
          hidePagination={true}
          hideViewOptions={true}
        />
      </CardContent>
    </Card>
  );
};

export default RecentOrders;

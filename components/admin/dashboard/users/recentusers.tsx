"use client";
import { RecentOrderColumnDefs } from "@/columndefs/order";
import {
  RecentUserColumnDefs,
  RecentUserColumnSkeletonDefs,
} from "@/columndefs/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DataTable from "@/components/ui/datatable";
import { sorders } from "@/data/MOCK_DATA_ORDERS";
import { susers } from "@/data/MOCK_DATA_USER";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { TOrder } from "@/types/db/order";
import { TUser } from "@/types/db/user";
import React from "react";
import { ViewAllLink } from "../..";

const RecentUsers = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/users/limit?limit=10`
  );
  //const orders = data?.orders as unknown as TOrder[];
  const mockUsers = new Array(5).fill(susers[0]);
  if (isLoading)
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between">
            <div>Recent Users</div>
            <ViewAllLink url="/admin/dashboard/users/user" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={RecentUserColumnSkeletonDefs}
            data={mockUsers}
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
  const pusers = susers.slice(25) as unknown as TUser[];
  // console.log("po : ", pusers);
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <div>Recent Users</div>
          <ViewAllLink url="/admin/dashboard/users/user" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable
          columns={RecentUserColumnDefs}
          data={pusers}
          filterBy="status"
          hideFilter={true}
          hidePagination={true}
          hideViewOptions={true}
        />
      </CardContent>
    </Card>
  );
};

export default RecentUsers;

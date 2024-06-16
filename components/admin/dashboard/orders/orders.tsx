"use client";
import { TOrder } from "@/types/db/order";
import DataTable from "@/components/ui/datatable";
import { sorders } from "@/data/MOCK_DATA_ORDERS";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { OrderColumnDefs } from "@/columndefs/order";
import { Card, CardContent } from "@/components/ui/card";

const Orders = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/order/list`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  const { orders }: { orders: TOrder[] } = data;
  // console.log("orders page : ", data.orders);
  const porders = sorders as unknown as TOrder[];
  //const porders = orders as unknown as TOrder[];
  //console.log("orders[0] : ", porders[0]);
  return (
    <>
      <Card>
        <CardContent>
          <DataTable
            columns={OrderColumnDefs}
            data={porders}
            filterBy="status"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Orders;

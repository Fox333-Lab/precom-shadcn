import { useSWRFetch } from "@/lib/hooks/usefetch";
import DataTable from "@/components/ui/datatable";
import { UserOrderColumnDefs } from "@/columndefs/order";
import { Card, CardContent } from "@/components/ui/card";

type CustomerOrdersPropsTypes = {
  userid: string;
};

const UserOrders = ({ userid }: CustomerOrdersPropsTypes) => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/user/dashboard/order/${userid}`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  console.log("data", data);
  return (
    <>
      <Card>
        <CardContent>
          <DataTable
            columns={UserOrderColumnDefs}
            data={data.userOrders}
            filterBy="status"
            hideViewOptions
          />
        </CardContent>
      </Card>
    </>
  );
};

export default UserOrders;

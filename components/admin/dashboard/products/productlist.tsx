"use client";
import { productColumnDefs } from "@/columndefs/product";
import { Card, CardContent } from "@/components/ui/card";
import DataTable from "@/components/ui/datatable";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { TAdminAllProduct, TProduct } from "@/types/db/product";

const ProductList = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/products/list`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  const { products }: { products: TAdminAllProduct[] } = data;
  console.log("products page : ", products);
  //const porders = sorders as unknown as TOrder[];
  //const porders = orders as unknown as TOrder[];
  //console.log("orders[0] : ", porders[0]);
  return (
    <>
      <Card>
        <CardContent>
          <DataTable
            columns={productColumnDefs}
            data={products}
            filterBy="name"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default ProductList;

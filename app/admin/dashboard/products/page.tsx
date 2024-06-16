import { ProductList } from "@/components/admin/dashboard/products";
import { H3 } from "@/components/ui/textui";
import React from "react";

const ProductListPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>Product List</H3>
        {/* <Separator /> */}
      </div>
      <ProductList />
    </div>
  );
};

export default ProductListPage;

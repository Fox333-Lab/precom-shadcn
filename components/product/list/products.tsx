"use client";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import ProductCard from "./productcard";
import IProduct from "@/types/db/product";

const Products = () => {
  const { data, error, isLoading } = useSWRFetch("/api/products");

  if (data) {
    console.log("components/product/products : ", data.products);
  }
  if (isLoading) {
    return <>loading...</>;
  }
  if (data)
    return (
      <div className="grid gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
        {/* <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"> */}
        {data.products.map((product: IProduct) => (
          //   <div className="">
          <ProductCard key={product._id.toString()} product={product} />
          //   </div>
        ))}
      </div>
    );
};

export default Products;

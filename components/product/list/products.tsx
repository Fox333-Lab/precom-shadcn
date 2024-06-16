"use client";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import ProductCard from "./productcard";
import IProduct from "@/types/db/product";
import Filter from "../browse/filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchProducts from "../browse/searchproducts";
import SortFilter from "../browse/sortfilter";
import NewsLetter from "@/components/shared/newsletter";

const Products = () => {
  // const { data, error, isLoading } = useSWRFetch("/api/products");
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = searchParams.get("search") || "";
  const { data, error, isLoading } = useSWRFetch(
    `/api/products/details/browse?${searchParams.toString()}`
  );
  console.log("searchParams : ", searchParams.toString());
  const filterHandler = ({
    search,
    category,
    brand,
    color,
    size,
    price,
    sortBy,
  }: any) => {
    console.log("filterHandler");
    const params = new URLSearchParams(searchParams);
    const path = pathname;
    console.log("path : ", path);
    // search query starts here
    if (search) {
      console.log("first search : ", search);
      params.set("search", search);
    } else if (search == "") {
      console.log("delete");
      params.delete("search");
    }
    // category query starts here
    if (category) {
      console.log("category : ", category);
      params.set("category", category);
    } else if (category == "") {
      console.log("delete");
      params.delete("category");
    }
    // brand query starts here
    if (brand) {
      console.log("brand : ", brand);
      params.set("brand", brand);
    } else if (brand == "") {
      console.log("delete");
      params.delete("brand");
    }
    // color query starts here
    if (color) {
      console.log("color : ", color);
      params.set("color", color);
    } else if (color == "") {
      console.log("delete");
      params.delete("color");
    }
    // size query starts here
    if (size) {
      console.log("size : ", size);
      params.set("size", size);
    } else if (size == "") {
      console.log("delete");
      params.delete("size");
    }
    // price query starts here
    if (price) {
      console.log("price : ", price);
      console.log("price : ", price.min);
      console.log("price : ", price.max);
      params.set("min", price.min);
      params.set("max", price.max);
    } else if (price == null) {
      console.log("delete");
      params.delete("min");
      params.delete("max");
    }
    // sort query starts here
    if (sortBy) {
      console.log("sortBy : ", sortBy);
      params.set("sort", sortBy);
    } else if (sortBy == "") {
      console.log("delete");
      params.delete("sort");
    }
    console.log("params.toString() : ", params.toString());
    router.push(`${path}?${params.toString()}`, { scroll: false });
  };
  const searchHandler = (search: string) => {
    filterHandler({ search });
  };
  const categoryFilterHandler = (category: string) => {
    console.log("categoryFilterHandler : ", category);
    filterHandler({ category });
  };
  const brandFilterHandler = (brand: string) => {
    filterHandler({ brand });
  };
  const colorFilterHandler = (color: string) => {
    filterHandler({ color });
  };
  const sizeFilterHandler = (size: string) => {
    filterHandler({ size });
  };
  const priceFilterHandler = (min: string, max: string) => {
    min = min == "" ? "0" : min;
    max = max == "" ? "0" : max;
    //let price = `${min}_${max}`;
    type Price = { min: string; max: string };
    let price: Price | null = { min, max };
    if (min == "0" && max == "0") price = null;
    filterHandler({ price });
  };
  const sortFilterHandler = (sortBy: string) => {
    filterHandler({ sortBy });
  };

  const checkChecked = (queryName: string, value: string): boolean => {
    console.log("searchParams.get(queryName) : ", searchParams.get(queryName));
    console.log(
      "searchParams.get(queryName)?.search(value) : ",
      searchParams.get(queryName)?.search(value)
    );
    console.log("value : ", value);

    if (
      searchParams.get(queryName) != null &&
      searchParams.get(queryName)?.search(value) !== -1
    ) {
      return true;
    }
    return false;
  };
  if (data) {
    console.log("components/product/products data.products : ", data.products);
    console.log(
      "components/product/products data.categories : ",
      data.categories
    );
    console.log(
      "components/product/products data.subCategories : ",
      data.subCategories
    );
    console.log("components/product/products data.sizes : ", data.sizes);
    console.log("components/product/products data.brands : ", data.brands);
    console.log("components/product/products data.styles : ", data.styles);
  }
  if (isLoading) {
    return <>loading...</>;
  }
  if (data)
    return (
      <div>
        <div className="flex justify-around">
          <SearchProducts searchHandler={searchHandler} searchQuery={query} />
          <SortFilter sortFilterHandler={sortFilterHandler} />
        </div>

        <Filter
          categories={data.categories}
          subCategories={data.subCategories}
          sizes={data.sizes}
          colors={data.colors}
          brands={data.brands}
          styles={data.styles}
          categoryFilterHandler={categoryFilterHandler}
          brandFilterHandler={brandFilterHandler}
          sizeFilterHandler={sizeFilterHandler}
          priceFilterHandler={priceFilterHandler}
          colorFilterHandler={colorFilterHandler}
          checkChecked={checkChecked}
          params={searchParams}
        />
        <div className="grid gap-x-3 md:gap-x-5 xl:gap-x-7 gap-y-3 xl:gap-y-5 2xl:gap-y-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
          {/* <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"> */}
          {data.products.map((product: IProduct) => (
            //   <div className="">
            <ProductCard key={product._id.toString()} product={product} />
            //   </div>
          ))}
        </div>
        <NewsLetter />
      </div>
    );
};

export default Products;

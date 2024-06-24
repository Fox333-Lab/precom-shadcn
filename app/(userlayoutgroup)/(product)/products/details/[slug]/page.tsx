"use client";
import { cn } from "@/lib/utils";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import IProduct, { IImage, IStyle } from "@/types/db/product";
// import { DetailsAccordian, ProductDetailSwiper } from "@/components/product";
// import Reviews from "@/components/product/reviews";
// import { addToCart, updateCart } from "@/store/features/cart/cartSlice";
import axios from "axios";
import { Heart, Minus, Plus, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductDetailSwiper from "@/components/product/details/productdetailswiper";
import Image from "next/image";
import DetailsAccordian from "@/components/shared/accordian";
import {
  CartState,
  addToCart,
  updateCart,
} from "@/store/features/cart/cartslice";
import { ICartProduct } from "@/types/db/cart";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H2, H3, H4, H5, H6, Para } from "@/components/ui/textui";
import Reviews from "@/components/product/reviews";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import winter1 from "@/public/images/winter1.jpg";
import winter2 from "@/public/images/winter2.jpg";
import winter3 from "@/public/images/winter3.jpg";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Details = ({ params }: { params: { slug: string } }) => {
  const [activeImg, setActiveImg] = useState("");
  const [errorActive, setErrorActive] = useState(true);
  const [pqty, setPqty] = useState(1);

  const searchParams = useSearchParams();
  const pstyle: number = searchParams.get("style") as unknown as number;
  const psize: number = (searchParams.get("size") || 0) as number;
  const sizeQtyCount: number = searchParams.get("size") as unknown as number;

  // cart functionality - starts
  //const { cart } = useSelector((state) => ({ ...state }));
  const cart: CartState = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();
  // cart functionality - ends

  // console.log("app/product/details cart : ", cart);
  // console.log("app/product/details search params : style : ", pstyle);
  // console.log("app/product/details : params.slug :", params.slug);
  // console.log("app/product/details : params.slug :", psize);
  // console.log("app/product/details : sizeQtyCount :", sizeQtyCount);
  const { data, error, isLoading } = useSWRFetch(
    `/api/products/details/${params.slug}/${pstyle}/${psize}`,
  );
  const productDetails = data?.product;
  useEffect(() => {
    setPqty(1);
  }, [pstyle]);
  useEffect(() => {
    if (pqty > productDetails?.quantity) {
      setPqty(productDetails?.quantity);
    }
  }, [sizeQtyCount]);
  // cart functionality - starts
  const addToCartHandler = async () => {
    console.log("addToCartHandler");
    // not using useProduct here bcoz hooks can only be used/called in body of function component
    const { data: pdata } = await axios.get(
      `/api/products/id/${productDetails._id}?style=${productDetails.style}&size=${psize}`,
    );
    console.log("pdata : ", pdata);
    if (pqty > pdata.quantity) {
      //setError("Quantity not available in stock");
      console.log("Quantity not available in stock");
      return;
    } else if (pqty < 1) {
      //setError("Out of stock");
      console.log("Out of stock");
      return;
    } else {
      let _uid = `${pdata._id}_${pdata.style}_${pdata.size}`;
      let exist = cart.cartItems.find((p: ICartProduct) => p._uid === _uid);
      console.log("exist : ", exist);
      if (exist) {
        // update
        let newCart = cart.cartItems.map((p: ICartProduct) => {
          if (p._uid == exist?._uid) {
            return { ...p, pqty: pqty };
          }
          return p;
        });
        console.log("newCart : ", newCart);
        dispatch(updateCart(newCart));
      } else {
        dispatch(addToCart({ ...pdata, pqty, size: pdata.size, _uid }));
      }
    }
    if (pdata) {
      console.log("pdata by id : ", pdata);
      console.log("cart.cartItems : ", cart.cartItems);
    }
  };
  // cart functionality - ends
  if (error) {
    return <div>error</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>no product found</div>;
  }

  console.log("in app/products/details : new product : ", productDetails);

  return (
    <div className="min-h-screen">
      <div className="flex flex-col gap-9">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/products">Products</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/categories">
                {productDetails.category.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{productDetails.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="block w-full lg:hidden">
          <ProductDetailSwiper images={productDetails.images} />
        </div>
        <div className="hidden lg:grid lg:grid-cols-4 lg:grid-rows-2 lg:gap-8">
          <div>
            <Image
              src={winter1}
              alt=""
              className="h-full w-full rounded-lg object-cover saturate-100 filter"
            />
          </div>
          <div className="lg:col-span-2 lg:row-span-2">
            <Image
              src={winter2}
              alt=""
              className="h-full w-full rounded-lg object-cover saturate-100 filter"
            />
          </div>
          <div>
            <Image
              src={winter3}
              alt=""
              className="h-full w-full rounded-lg object-cover saturate-100 filter"
            />
          </div>
          <div>
            <Image
              src={winter3}
              alt=""
              className="h-full w-full rounded-lg object-cover saturate-100 filter"
            />
          </div>
          <div>
            <Image
              src={winter1}
              alt=""
              className="h-full w-full rounded-lg object-cover saturate-100 filter"
            />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-4">
          <div className="flex flex-col gap-5 lg:col-span-3">
            <H2 className="">{productDetails.name}</H2>
            <Para className="text-muted-foreground">
              {productDetails.description}
            </Para>
            <div className="mt-5 lg:w-[50%]">
              <DetailsAccordian details={productDetails.details} />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            {/* price */}
            <div>
              <H2 className="font-bold text-primary">
                ${productDetails.price}
              </H2>
            </div>
            {/* color choices */}
            <div className="flex flex-wrap gap-3">
              {productDetails.colors.map((ci: IStyle, i: number) => {
                console.log(
                  `i = ${i} / pstyle = ${pstyle} / image = ${ci.image} / ci.color = ${ci.color}`,
                );
                return ci.image ? (
                  <Link
                    href={`/products/details/${params.slug}?style=${i}`}
                    key={i}
                    className="rounded-full border border-transparent p-1 hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400"
                    style={{
                      border: `${
                        i == pstyle ? `1px solid rgb(156,163,175,0.9)` : ``
                      }`,
                    }}
                  >
                    <div
                      className="h-8 w-8 rounded-full bg-red-600 bg-cover bg-center bg-no-repeat"
                      style={{ backgroundImage: `URL(${ci.image})` }}
                      onMouseOver={() =>
                        setActiveImg(
                          productDetails.subProducts[i].images[0].url,
                        )
                      }
                      onMouseLeave={() => setActiveImg("")}
                    ></div>
                  </Link>
                ) : (
                  <Link
                    href={`/products/details/${params.slug}?style=${i}`}
                    key={i}
                    className="rounded-full border border-transparent p-1 hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400"
                    style={{
                      border: `${
                        i == pstyle ? `1px solid rgb(156,163,175,0.9)` : ``
                      }`,
                    }}
                  >
                    <div
                      className="h-8 w-8 rounded-full"
                      style={{ backgroundColor: ci.color.toString() }}
                      onMouseOver={() =>
                        setActiveImg(
                          productDetails.subProducts[i].images[0].url,
                        )
                      }
                      onMouseLeave={() => setActiveImg("")}
                    ></div>
                  </Link>
                );
              })}
            </div>
            {/* size choices */}
            <div className="flex flex-col gap-2">
              <H6 className="">Select Size</H6>
              <div className="flex flex-wrap gap-3">
                {productDetails.sizes.map((sz: { size: string }, i: number) => {
                  return (
                    <Link
                      href={`/products/details/${params.slug}?style=${pstyle}&size=${i}`}
                      key={i}
                      className={cn("text-center", {
                        "": i == sizeQtyCount,
                      })}
                    >
                      <Button
                        variant={i == sizeQtyCount ? `default` : `outline`}
                      >
                        <span className="font-bold">{sz.size}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* quantity choice */}
            <div className="flex flex-col gap-2">
              <H6 className="">Quantity</H6>
              <div className="flex justify-between gap-1">
                <div className="flex">
                  <Button
                    variant="outline"
                    onClick={() => pqty > 1 && setPqty((prev) => prev - 1)}
                    className=""
                  >
                    {/* <span className="m-auto text-2xl font-thin">-</span> */}
                    <Minus size={16} />
                  </Button>
                  <span className="flex items-center justify-center px-4 text-center font-bold outline-none">
                    {pqty}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      pqty < productDetails.quantity &&
                      setPqty((prev) => prev + 1)
                    }
                    className=""
                  >
                    {/* <span className="m-auto text-2xl font-thin">+</span> */}
                    <Plus size={16} />
                  </Button>
                </div>
                <div className="flex items-end gap-1">
                  <H3 className="">
                    #
                    {sizeQtyCount
                      ? productDetails.quantity
                      : productDetails.sizes.reduce(
                          (start: any, next: { qty: any }) => start + next.qty,
                          0,
                        )}
                  </H3>
                  <span>left in stock</span>
                </div>
              </div>
            </div>
            {/* buy/cart */}
            <div className="flex w-full gap-6">
              <Button
                disabled={productDetails.quantity < 1}
                rounded="full"
                className={cn("flex-1", {
                  "cursor-not-allowed": productDetails.quantity < 1,
                })}
              >
                Buy
              </Button>
              <Button
                variant="outline"
                rounded="full"
                disabled={productDetails.quantity < 1}
                className={cn("", {
                  "cursor-not-allowed": productDetails.quantity < 1,
                })}
                onClick={() => addToCartHandler()}
              >
                <ShoppingCart size={16} />
              </Button>
              {/* <IconButton className="" variant="outline" size="3" radius="full">
                <Heart size={16} />
              </IconButton> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;

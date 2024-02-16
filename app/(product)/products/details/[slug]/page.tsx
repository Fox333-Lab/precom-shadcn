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
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { H2, H3, H4, H5, Para } from "@/components/ui/textui";

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

  console.log("app/product/details cart : ", cart);
  // console.log("app/product/details search params : style : ", pstyle);
  // console.log("app/product/details : params.slug :", params.slug);
  // console.log("app/product/details : params.slug :", psize);
  // console.log("app/product/details : sizeQtyCount :", sizeQtyCount);
  const { data, error, isLoading } = useSWRFetch(
    `/api/products/details/${params.slug}/${pstyle}/${psize}`
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
      `/api/products/id/${productDetails._id}?style=${productDetails.style}&size=${psize}`
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

  console.log(
    "in app/products/details : new product : ",
    productDetails.details
  );

  return (
    <div className="min-h-screen">
      <section>
        <div className="flex flex-col justify-between lg:flex-row gap-10 lg:gap-14">
          <div className="flex flex-col grow shrink-0 gap-6 basis-1/4">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <span className="font-medium">New</span>
                <H2>{productDetails.name}</H2>
                <div className="flex flex-wrap items-center">
                  <ul className="flex mr-2 lg:mb-0">
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="w-4 mr-1 text-red-500 dark:text-gray-400 bi bi-star "
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                  {/* <a
                      className="mb-4 text-xs underline dark:text-gray-400 dark:hover:text-gray-300 lg:mb-0"
                      href="#"
                    >
                      Be the first to review the product
                    </a> */}
                </div>
              </div>
              <Para className="lg:max-w-md text-muted-foreground">
                {productDetails.description}
              </Para>

              {/* <div className="p-4 mb-8 border border-gray-300 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-semibold dark:text-gray-400">
                      Real time{" "}
                      <span className="px-2 bg-blue-500 text-gray-50">26</span>
                      visitors right now!{" "}
                    </h2>
                    <div className="mb-1 text-xs font-medium text-gray-700 dark:text-gray-400">
                      Hurry up! left 23 in Stock
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5  dark:bg-gray-600">
                      <div
                        className="bg-blue-600 dark:bg-blue-400 h-2.5 rounded-full"
                        style={{ width: "45%" }}
                      ></div>
                    </div>
                  </div> */}
              <div className="flex flex-col flex-wrap gap-3">
                <div className="flex flex-wrap items-end gap-3 font-semibold">
                  <span>
                    <H3>${productDetails.price}</H3>
                  </span>
                  <span className="font-normal text-gray-500 line-through">
                    ${productDetails.priceBefore}
                  </span>
                </div>
                <span className="text-blue-500">
                  {productDetails.shipping
                    ? `+${productDetails.shipping} shipping fee`
                    : "Free Shipping"}
                </span>
              </div>
            </div>
            {/* <Separator size="4" className="md:max-w-md" /> */}
            <div className="flex gap-1 items-end">
              <H3 className="">
                #
                {sizeQtyCount
                  ? productDetails.quantity
                  : productDetails.sizes.reduce(
                      (start: any, next: { qty: any }) => start + next.qty,
                      0
                    )}
              </H3>
              <span>left in stock</span>
            </div>
            <DetailsAccordian details={productDetails.details} />
          </div>
          <Separator className="lg:max-w-md block lg:hidden" color="gray" />
          <div className="flex gap-1 grow basis-1/2 order-first lg:order-none">
            <div className="hidden lg:w-full lg:grid lg:grid-cols-2 gap-3">
              {productDetails.images &&
                productDetails.images.map((image: IImage, i: number) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-md border border-gray-200 h-fit overflow-hidden"
                  >
                    <img
                      src={image.url.toString()}
                      alt="image"
                      className="w-full object-cover"
                    />
                  </div>
                ))}
            </div>
            <div className="w-full block lg:hidden">
              <ProductDetailSwiper images={productDetails.images} />
            </div>
          </div>
          <div className="flex flex-col shrink-0 gap-6 grow basis-1/4">
            <div className="flex flex-col gap-2">
              <H4>Color</H4>
              <div className="flex flex-wrap gap-1">
                {productDetails.colors.map((ci: IStyle, i: number) => {
                  console.log(
                    `i = ${i} / pstyle = ${pstyle} / image = ${ci.image} / ci.color = ${ci.color}`
                  );
                  return ci.image ? (
                    <Link
                      href={`/products/details/${params.slug}?style=${i}`}
                      key={i}
                      className="p-1 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400"
                      style={{
                        border: `${
                          i == pstyle ? `1px solid rgb(156,163,175,0.9)` : ``
                        }`,
                      }}
                    >
                      <div
                        className="w-6 h-6 bg-red-600 rounded-full bg-no-repeat bg-cover bg-center"
                        style={{ backgroundImage: `URL(${ci.image})` }}
                        onMouseOver={() =>
                          setActiveImg(
                            productDetails.subProducts[i].images[0].url
                          )
                        }
                        onMouseLeave={() => setActiveImg("")}
                      ></div>
                    </Link>
                  ) : (
                    <Link
                      href={`/products/details/${params.slug}?style=${i}`}
                      key={i}
                      className="p-1 border border-transparent rounded-full hover:border-gray-400 dark:border-gray-800 dark:hover:border-gray-400"
                      style={{
                        border: `${
                          i == pstyle ? `1px solid rgb(156,163,175,0.9)` : ``
                        }`,
                      }}
                    >
                      <div
                        className="w-6 h-6 rounded-full"
                        style={{ backgroundColor: ci.color.toString() }}
                        onMouseOver={() =>
                          setActiveImg(
                            productDetails.subProducts[i].images[0].url
                          )
                        }
                        onMouseLeave={() => setActiveImg("")}
                      ></div>
                    </Link>
                  );
                })}
              </div>
            </div>
            {/* <Separator size="4" className="lg:max-w-md" /> */}
            <div className="flex flex-col gap-2">
              <H4>Size</H4>
              <div className="flex flex-wrap gap-2">
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
            <Separator className="lg:max-w-md" />
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  onClick={() => pqty > 1 && setPqty((prev) => prev - 1)}
                  className="r"
                >
                  {/* <span className="m-auto text-2xl font-thin">-</span> */}
                  <Minus size={16} />
                </Button>
                <span className="flex px-4 items-center justify-center font-bold w-full text-center outline-none">
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
            </div>
            <Separator className="lg:max-w-md" />
            <div className="flex gap-3 justify-between">
              <Button
                variant="outline"
                disabled={productDetails.quantity < 1}
                className={cn("flex-1", {
                  "cursor-not-allowed": productDetails.quantity < 1,
                })}
                onClick={() => addToCartHandler()}
              >
                <ShoppingCart size={16} />
              </Button>
              <Button
                disabled={productDetails.quantity < 1}
                className={cn("flex-1", {
                  "cursor-not-allowed": productDetails.quantity < 1,
                })}
              >
                Buy
              </Button>

              {/* <IconButton className="" variant="outline" size="3" radius="full">
                <Heart size={16} />
              </IconButton> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Details;

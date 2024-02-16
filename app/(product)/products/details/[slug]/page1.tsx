"use client";
import { cn } from "@/_lib/utils";
import { useSWRFetch } from "@/_lib/hooks/usefetch";
import IProduct, { IStyle } from "@/types/db/product";
import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Section,
  Separator,
  Text,
  Link as RadixLink,
  AspectRatio,
} from "@radix-ui/themes";
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

const Details = ({ params }: { params: { slug: string } }) => {
  const [activeImg, setActiveImg] = useState("");
  const [errorActive, setErrorActive] = useState(true);
  const [pqty, setPqty] = useState(1);

  const searchParams = useSearchParams();
  const pstyle: number = searchParams.get("style") as unknown as number;
  const psize: number = (searchParams.get("size") || 0) as number;
  const sizeQtyCount: number = searchParams.get("size") as unknown as number;

  // cart functionality - starts
  //   const { cart } = useSelector((state) => ({ ...state }));
  //   const dispatch = useDispatch();
  // cart functionality - ends

  console.log("app/product/details search params : style : ", pstyle);
  console.log("app/product/details : params.slug :", params.slug);
  console.log("app/product/details : params.slug :", psize);
  console.log("app/product/details : sizeQtyCount :", sizeQtyCount);
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
    //     console.log("addToCartHandler");
    //     // not using useProduct here bcoz hooks can only be used/called in body of function component
    //     const { data: pdata } = await axios.get(
    //       `/api/products/id/${productDetails._id}?style=${productDetails.style}&size=${psize}`
    //     );
    //     if (pqty > pdata.quantity) {
    //       setError("Quantity not available in stock");
    //       return;
    //     } else if (pqty < 1) {
    //       setError("Out of stock");
    //       return;
    //     } else {
    //       let _uid = `${pdata._id}_${pdata.style}_${pdata.size}`;
    //       let exist = cart.cartItems.find((p) => p._uid === _uid);
    //       if (exist) {
    //         // update
    //         let newCart = cart.cartItems.map((p) => {
    //           if (p._uid == exist._uid) {
    //             return { ...p, pqty: pqty };
    //           }
    //           return p;
    //         });
    //         dispatch(updateCart(newCart));
    //       } else {
    //         dispatch(addToCart({ ...pdata, pqty, size: pdata.size, _uid }));
    //       }
    //     }
    //     if (pdata) {
    //       console.log("pdata by id : ", pdata);
    //       console.log("cart.cartItems : ", cart.cartItems);
    //     }
  };
  // cart functionality - ends
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>no product found</div>;
  }

  console.log("in app/products/details : new product : ", productDetails);

  return (
    <div className="min-h-screen">
      {/* <div className="breadcrumbs">
        <ul>
          <li>Home</li>
          <li>{productDetails.category.name}</li>
          {productDetails.subCategories.map((sub) => {
            return <li key={sub._id}>{sub.name}</li>;
          })}
        </ul>
      </div> */}
      {/* {error && ( */}
      <div
        className={`alert alert-warning ${errorActive ? `block` : `hidden`}`}
      >
        <button onClick={() => setErrorActive(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </button>
        <span>{error}</span>
      </div>
      {/* )} */}
      {/* <Box className="bg-red-500">test box</Box>
      <Section size="3" className="bg-green-400">
        test section
      </Section> */}

      <Section className="py-20">
        {/* <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6"> */}
        {/* <div className="max-w-6xl mx-auto"> */}
        <Flex className="flex-col md:flex-row" gap="8">
          {/* <ProductDetailSwiper
              images={productDetails.images}
              activeImg={activeImg}
            /> */}
          <div className="w-full md:w-1/2">
            <ProductDetailSwiper
              images={productDetails.images}
              // activeImg={activeImg}
            />
          </div>
          <Box className="">
            <Flex direction="column" gap="6">
              <Flex direction="column" gap="5" className="">
                <Flex direction="column" gap="3">
                  <RadixLink>
                    <Text trim="both" className="font-medium">
                      New
                    </Text>
                  </RadixLink>
                  <Heading className="text-xl font-bold md:text-4xl">
                    {productDetails.name}
                  </Heading>
                  <Flex className="" wrap="wrap" align="center">
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
                  </Flex>
                </Flex>
                <Text as="p" className="md:max-w-md">
                  {productDetails.description}
                </Text>

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
                <Flex direction="column" gap="1" wrap="wrap">
                  <Flex
                    gap="3"
                    align="baseline"
                    className="text-2xl font-semibold"
                    wrap="wrap"
                  >
                    <Text size="5">${productDetails.price}</Text>
                    <Text
                      size="3"
                      className="font-normal text-gray-500 line-through"
                    >
                      ${productDetails.priceBefore}
                    </Text>
                  </Flex>
                  <Text size="3" className="text-blue-500">
                    {productDetails.shipping
                      ? `+${productDetails.shipping} shipping fee`
                      : "Free Shipping"}
                  </Text>
                </Flex>
              </Flex>
              <Separator size="4" className="md:max-w-md" />
              <Flex className="" gap="1" align="baseline">
                <Heading size="5" className="text-success font-medium text-lg">
                  #
                  {sizeQtyCount
                    ? productDetails.quantity
                    : productDetails.sizes.reduce(
                        (start: any, next: { qty: any }) => start + next.qty,
                        0
                      )}
                </Heading>
                <Text>quantity left in stock</Text>
              </Flex>
              <Flex direction="column" gap="2" className="">
                <Heading size="4" className="font-bold">
                  Color
                </Heading>
                <Flex className="" wrap="wrap" gap="1">
                  {productDetails.colors.map((ci: IStyle, i: number) => {
                    console.log(`i = ${i} / pstyle = ${pstyle} / ${ci.image}`);
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
                </Flex>
              </Flex>
              <Flex direction="column" gap="2" className="">
                <Heading size="4" className="font-bold dark:text-gray-400">
                  Size
                </Heading>
                <Flex className="" gap="2" wrap="wrap">
                  {productDetails.sizes.map(
                    (sz: { size: string }, i: number) => {
                      return (
                        <Link
                          href={`/products/details/${params.slug}?style=${pstyle}&size=${i}`}
                          key={i}
                          className={cn("text-center", {
                            "": i == sizeQtyCount,
                          })}
                        >
                          <IconButton
                            variant={i == sizeQtyCount ? `solid` : `outline`}
                          >
                            {sz.size}
                          </IconButton>
                        </Link>
                      );
                    }
                  )}

                  {/* <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                      S
                    </button>
                    <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                      M
                    </button>
                    <button className="py-1 mb-2 mr-1 border w-11 hover:border-blue-400 hover:text-blue-600 dark:border-gray-400 dark:hover:border-gray-300 dark:text-gray-400">
                      XS
                    </button> */}
                </Flex>
              </Flex>
              <Separator size="4" className="md:max-w-md" />
              <Flex className="" wrap="wrap" align="center" gap="3">
                <Flex className="" gap="1">
                  <IconButton
                    size="3"
                    variant="outline"
                    onClick={() => pqty > 1 && setPqty((prev) => prev - 1)}
                    className=""
                  >
                    {/* <span className="m-auto text-2xl font-thin">-</span> */}
                    <Minus size={16} />
                  </IconButton>
                  <Text
                    weight="bold"
                    className="flex px-4 items-center justify-center w-full text-center text-gray-700 placeholder-gray-700 bg-gray-100 outline-none dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-900 focus:outline-none text-md hover:text-black"
                  >
                    {pqty}
                  </Text>
                  <IconButton
                    size="3"
                    variant="outline"
                    onClick={() =>
                      pqty < productDetails.quantity &&
                      setPqty((prev) => prev + 1)
                    }
                    className=""
                  >
                    {/* <span className="m-auto text-2xl font-thin">+</span> */}
                    <Plus size={16} />
                  </IconButton>
                </Flex>
                <Box className="">
                  <Button
                    size="3"
                    disabled={productDetails.quantity < 1}
                    className={`${
                      productDetails.quantity < 1 ? `cursor-not-allowed` : ``
                    }`}
                  >
                    Buy Now
                  </Button>
                </Box>
                <Box className="">
                  <IconButton
                    size="3"
                    variant="outline"
                    disabled={productDetails.quantity < 1}
                    className={`${
                      productDetails.quantity < 1 ? `cursor-not-allowed` : ``
                    } `}
                    onClick={() => addToCartHandler()}
                  >
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                    </svg> */}
                    <ShoppingCart size={16} />
                  </IconButton>
                </Box>
                <Box className="">
                  <IconButton className="" variant="outline" size="3">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className=" bi bi-heart"
                      viewBox="0 0 16 16"
                    >
                      <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                    </svg> */}
                    <Heart size={16} />
                  </IconButton>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Flex>
        {/* <DetailsAccordian details={productDetails.details} />
          <Reviews product={productDetails} /> */}
        {/* </div> */}
      </Section>
    </div>
  );
};

export default Details;

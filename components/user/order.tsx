import IOrder, { IOrderProduct } from "@/types/db/order";
import React, { useEffect, useReducer } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { H1, H2, H3, H4, H5, H6, Para } from "../ui/textui";
import { cn } from "@/lib/utils";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import IUser from "@/types/db/user";
import {
  PayPalButtons,
  SCRIPT_LOADING_STATE,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { StripePay } from "../payment";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type OrderPropsTypes = {
  data: IOrder;
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "PAY_REQUEST":
      return { ...state, loading: true };
    case "PAY_SUCCESS":
      return { ...state, loading: false, success: true };
    case "PAY_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "PAY_RESET":
      return { ...state, loading: false, success: false, error: false };
  }
}

const Order = ({ data }: OrderPropsTypes) => {
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
  const [{ success, order }, dispatch] = useReducer(reducer, {});
  const orderData = data as unknown as IOrder;
  const user = data.user as unknown as IUser;
  const orderProducts = data.products as unknown as IOrderProduct[];
  console.log("orderProducts : ", orderProducts);

  const createOrderHandler = async (
    data: any,
    actions: any,
  ): Promise<string> => {
    console.log("in createOrderHandler");
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: orderData.total,
            },
          },
        ],
      })
      .then((order_id: any) => {
        console.log("createOrderHandler order_id : ", order_id);
        return order_id;
      });
  };
  const onApproveHandler = async (data: any, actions: any): Promise<void> => {
    console.log("in onApproveHandler");
    return actions.order.capture().then(async (details: any) => {
      try {
        console.log("onApproveHandler details : ", details);
        dispatch({ type: "PAY_REQUEST" });
        const { data } = await axios.put(
          `/api/user/order/${orderData._id}/paywithpaypal`,
          {
            details,
            order_id: orderData._id.toString(),
          },
        );
        console.log("first data : ", data);
        dispatch({ type: "PAY_SUCCESS", payload: data });
      } catch (err: any) {
        console.log("onApproveHandler err : ", err);
        dispatch({ type: "PAY_FAIL", payload: err });
      }
    });
  };
  function onErrorHandler(error: any) {
    console.log("in onErrorHandler : ", error);
  }
  useEffect(() => {
    if (!orderData._id) {
      // if (success) {
      dispatch({ type: "PAY_RESET" });
      // }
    } else {
      paypalDispatch({
        type: "resetOptions",
        value: {
          clientId:
            "AXX6BGu9wTKWPI0IXl2FzgkN1HNYEQ70juuK3S0eoqQgUVPs8ZM1Inp8_emFX_lCifs7C5druk_lJ9dh",
          currency: "USD",
        },
      });
      paypalDispatch({
        type: "setLoadingStatus",
        value: SCRIPT_LOADING_STATE.PENDING,
      });
    }
  }, [order]);

  return (
    <div className="flex flex-col gap-10">
      <H1 className="text-center">Checkout</H1>
      <div className="flex flex-col justify-between gap-12 md:flex-row">
        <div style={{ flexGrow: 6 }} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <div className="flex gap-2">
              <span>Order Status</span>
              <span>:</span>
              <span
                className={cn("font-medium", {
                  "text-orange-500":
                    orderData.status.toLocaleLowerCase() === "pending",
                  "text-green-500":
                    orderData.status.toLocaleLowerCase() === "delivered",
                  "text-red-500":
                    orderData.status.toLocaleLowerCase() === "cancelled",
                  "text-yellow-300":
                    orderData.status.toLocaleLowerCase() === "processing",
                  "text-yellow-500":
                    orderData.status.toLocaleLowerCase() === "shipped",
                })}
              >
                {orderData.status}
              </span>
            </div>
            <div className="flex gap-2">
              <span>Payment Status</span>
              <span>:</span>
              <span
                className={cn("font-semibold", {
                  "text-green-400": orderData.isPaid === true,
                  "text-orange-500": orderData.isPaid === false,
                })}
              >
                {orderData.isPaid ? "Paid" : "Pending"}
              </span>
            </div>
          </div>
          <div className="rounded-lg border">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderProducts &&
                  orderProducts.map((orderProduct: any) => {
                    return (
                      <TableRow key={orderProduct._id}>
                        <TableCell>
                          <div className="flex items-center gap-4">
                            <div className="h-24 w-24 overflow-hidden rounded-md border border-gray-200 bg-gray-50">
                              <img
                                src={orderProduct.image.toString()}
                                alt={orderProduct.name.toString()}
                                className="aspect-square w-full rounded-md object-cover"
                              />
                            </div>
                            <div className="flex flex-col gap-2">
                              <H4>
                                {orderProduct.name.length > 30
                                  ? `${orderProduct.name
                                      .toString()
                                      .substring(0, 30)}`
                                  : orderProduct.name}
                              </H4>
                              <div className="flex flex-col gap-0">
                                <div className="flex gap-1">
                                  <span color="gray">Size</span>
                                  <span className="font-medium">:</span>
                                  <span className="font-medium">
                                    {orderProduct.size}
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <span color="gray">Color</span>
                                  <span className="font-medium">:</span>
                                  <span className="font-medium">
                                    {orderProduct.color.color}
                                  </span>
                                </div>
                                <div className="flex gap-1">
                                  <span color="gray">Price</span>
                                  <span className="font-medium">:</span>
                                  <span className="font-medium">
                                    {orderProduct.price}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{orderProduct.qty}</TableCell>
                        <TableCell>
                          {orderProduct.price * orderProduct.qty}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                {/* total */}
                <TableRow>
                  <TableCell colSpan={2}>Subtotal</TableCell>
                  <TableCell align="right">
                    {/* {orderProducts.reduce(
                    (acc: number, item: IOrderProduct) =>
                    acc + item.price * item.qty,
                    0
                )} */}
                    {orderData.totalBeforeDiscount.toString()}
                  </TableCell>
                </TableRow>
                {orderData.couponApplied && (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <div className="flex gap-1">
                        <span color="gray"> Coupon Applied</span>
                        <span className="font-medium">:</span>
                        <span className="font-medium text-green-500">
                          {orderData.couponApplied.toString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      -{" "}
                      {(
                        Number(orderData.totalBeforeDiscount) -
                        Number(orderData.total)
                      ).toFixed(2)}
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={2}>Tax</TableCell>
                  <TableCell align="right">
                    + {orderData.taxPrice.toString()}
                  </TableCell>
                </TableRow>
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>
                    <H4>Total</H4>
                  </TableCell>
                  <TableCell align="right">
                    <H4>{orderData.total.toString()}</H4>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </div>
        <div style={{ flexGrow: 4 }} className="">
          <div className="flex flex-col gap-10">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={user?.image.toString()} />
                <AvatarFallback>{user?.name.substring(0, 1)}</AvatarFallback>
              </Avatar>
              <div className="flex items-center gap-1">
                <H6>{user.name}</H6>
                <Para>({user.email})</Para>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3">
                <H4>Billing Address</H4>
                {/* <Separator className="my-2" /> */}
                <Card>
                  <CardHeader className="py-3">
                    <H6>
                      {orderData.shippingAddress.firstname}{" "}
                      {orderData.shippingAddress.lastname}
                    </H6>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="flex gap-1">
                    <H6>
                      {orderData.shippingAddress.firstname}{" "}
                      {orderData.shippingAddress.lastname}
                    </H6>
                  </div> */}
                    <Para className="flex flex-col">
                      <span>
                        {orderData.shippingAddress.address1},{" "}
                        {orderData.shippingAddress.address2}
                      </span>
                      <span>
                        {orderData.shippingAddress.state},{" "}
                        {orderData.shippingAddress.city} -{" "}
                        {orderData.shippingAddress.zipcode}
                      </span>
                      <span>{orderData.shippingAddress.country}</span>
                    </Para>
                  </CardContent>
                </Card>
              </div>
              <div className="flex flex-col gap-3">
                <H4>Shipping Address</H4>
                {/* <Separator className="my-2" /> */}
                <Card>
                  <CardHeader className="py-3">
                    <H6>
                      {orderData.shippingAddress.firstname}{" "}
                      {orderData.shippingAddress.lastname}
                    </H6>
                  </CardHeader>
                  <CardContent>
                    {/* <div className="flex gap-1">
                    <H6>
                      {orderData.shippingAddress.firstname}{" "}
                      {orderData.shippingAddress.lastname}
                    </H6>
                  </div> */}
                    <Para className="flex flex-col">
                      <span>
                        {orderData.shippingAddress.address1},{" "}
                        {orderData.shippingAddress.address2}
                      </span>
                      <span>
                        {orderData.shippingAddress.state},{" "}
                        {orderData.shippingAddress.city} -{" "}
                        {orderData.shippingAddress.zipcode}
                      </span>
                      <span>{orderData.shippingAddress.country}</span>
                    </Para>
                  </CardContent>
                </Card>
              </div>
            </div>
            {!orderData.isPaid && (
              <div>
                {orderData.paymentMethod.toLocaleLowerCase() === "paypal" && (
                  <div>
                    {isPending ? (
                      <span>loading...</span>
                    ) : (
                      <PayPalButtons
                        createOrder={createOrderHandler}
                        onApprove={onApproveHandler}
                        onError={onErrorHandler}
                      ></PayPalButtons>
                    )}
                  </div>
                )}
                {orderData.paymentMethod.toLocaleLowerCase() === "stripe" && (
                  <div>
                    <StripePay
                      total={Number(orderData.total)}
                      orderId={orderData._id.toString()}
                      stripePublicKey={
                        "pk_test_51OoOyfSCNDS3BJgKa9ZO5ofvMtBUWXlRlqqfpevFAFApKQh3XT5R6V94o5nLULC2iHVSLEFy3KZwmCXbO395xZ5n00ZeZPOs7p"
                      }
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;

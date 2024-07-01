"use client";
import { Order } from "@/components/user";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import React from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PayPalScriptOptions } from "@paypal/paypal-js/types/script-options";

const OrderPage = ({ params }: { params: { orderid: string } }) => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/user/order/${params.orderid}`
  );
  const initialPaypalOptions: PayPalScriptOptions = {
    clientId:
      "AXX6BGu9wTKWPI0IXl2FzgkN1HNYEQ70juuK3S0eoqQgUVPs8ZM1Inp8_emFX_lCifs7C5druk_lJ9dh",
    currency: "USD",
    intent: "capture",
  };

  if (isLoading) return <div>loading...</div>;
  if (error) {
    console.log("errors : ", error);
    return <div>error</div>;
  }
  if (data) {
    console.log("OrderPage data : ", data);
  }
  return (
    <>
      <PayPalScriptProvider options={initialPaypalOptions}>
        <Order data={data.order} />
      </PayPalScriptProvider>
    </>
  );
};

export default OrderPage;

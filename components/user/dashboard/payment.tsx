"use client";
import { Payment } from "@/components/checkout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import IUser from "@/types/db/user";
import axios from "axios";
import React, { useState } from "react";

type CustomerPaymentPropsTypes = {
  user: IUser;
};

const CustomerPayment = ({ user }: CustomerPaymentPropsTypes) => {
  const [paymentDefaultMethod, setPaymentDefaultMethod] = useState<string>(
    user?.defaultPaymentMethod.toString() || ""
  );
  const [paymentMethod, setPaymentMethod] = useState<string>(
    user?.defaultPaymentMethod.toString() || ""
  );
  const [error, setError] = useState<string>("");
  const handlePaymentMethodChange = async () => {
    console.log("In handlePaymentMethodChange");
    try {
      const { data } = await axios.put(`/api/user/payments/method`, {
        defaultPaymentMethod: paymentMethod,
      });
      setError("");
      console.log("data.paymentMethod", data.paymentMethod);
      setPaymentDefaultMethod(data.paymentMethod);
    } catch (err: any) {
      console.log("error", err);
      setError(err.response.data.message);
    }
  };
  console.log("paymentMethod", paymentMethod);
  console.log(
    "paymentDefaultMethod == paymentMethod",
    paymentDefaultMethod == paymentMethod
  );
  return (
    <div className="">
      <Payment
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <Button
        disabled={!paymentMethod || paymentDefaultMethod == paymentMethod}
        className={cn("mt-3", {
          "cursor-not-allowed":
            !paymentMethod || paymentDefaultMethod == paymentMethod,
        })}
        onClick={() => handlePaymentMethodChange()}
      >
        Save
      </Button>
    </div>
  );
};

export default CustomerPayment;

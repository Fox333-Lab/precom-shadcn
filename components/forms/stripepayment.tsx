"use client";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElementOptions } from "@stripe/stripe-js";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import axios from "axios";
import { set } from "mongoose";

type StripePaymentPropsTypes = {
  total: number;
  orderId: string;
};
const CARD_OPTIONS: StripeCardElementOptions = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "#fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};
const StripePaymentForm = ({ total, orderId }: StripePaymentPropsTypes) => {
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("In components/forms/stripepayment.tsx - handleSubmit");
    e.preventDefault();
    const payCardElement = elements?.getElement(CardElement);
    if (!stripe || !payCardElement) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: payCardElement,
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const res = await axios.post(
          `/api/user/order/${orderId}/paywithstripe`,
          {
            amount: total,
            id,
          }
        );
        console.log("stripayment res : ", res);
        if (res.data.success) {
          console.log("Payment successful");
          window.location.reload();
        }
      } catch (err: any) {
        setError(err);
      }
    } else {
      setError(error.message?.toString() || "Payment failed");
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Label>
          Card details
          <CardElement />
        </Label>
        <Button type="submit" className="mt-4" size="full">
          Pay
        </Button>
        {error && <div className="mt-1">{error}</div>}
      </form>
    </div>
  );
};

export default StripePaymentForm;

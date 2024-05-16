"use client";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { useSession } from "next-auth/react";
import React from "react";
import CustomerPayment from "./payment";

const CustomerPayments = () => {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWRFetch(
    `/api/user/cart/${session?.user?.uid}`
  );
  if (isLoading) return <div>loading...</div>;
  if (error) {
    console.log("errors : ", error);
    return <div>error</div>;
  }
  return <CustomerPayment user={data.user} />;
};

export default CustomerPayments;

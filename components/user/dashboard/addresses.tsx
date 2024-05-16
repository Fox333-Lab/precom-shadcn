"use client";
import { Shipping } from "@/components/checkout";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import IUser, { IAddress } from "@/types/db/user";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CustomerAddress from "./address";

const CustomerAddresses = () => {
  const { data: session, status } = useSession();
  const { data, error, isLoading } = useSWRFetch(
    `/api/user/cart/${session?.user?.uid}`
  );
  if (isLoading) return <div>loading...</div>;
  if (error) {
    console.log("errors : ", error);
    return <div>error</div>;
  }
  return <CustomerAddress user={data.user} />;
};

export default CustomerAddresses;

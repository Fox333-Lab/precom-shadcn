"use client";
import { Shipping } from "@/components/checkout";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import IUser, { IAddress } from "@/types/db/user";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type CustomerAddressesPropsTypes = {
  user: IUser;
};

const CustomerAddress = ({ user }: CustomerAddressesPropsTypes) => {
  const [addresses, setAddresses] = useState<IAddress[]>(user?.address || []);
  return (
    <Shipping
      user={user as IUser}
      addresses={addresses}
      setAddresses={setAddresses}
    />
  );
};

export default CustomerAddress;

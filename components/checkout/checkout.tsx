"use client";
import { useEffect, useState } from "react";
import { CheckoutCart, Payment, Shipping, Summary } from ".";
import IUser, { IAddress } from "@/types/db/user";
import ICart from "@/types/db/cart";

type CheckoutPropsTypes = {
  cart: ICart;
  user: IUser;
};

const Checkout = ({ cart, user }: CheckoutPropsTypes) => {
  const [addresses, setAddresses] = useState<IAddress[]>(user?.address || []);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState("");
  const [selectedAddress, setSelectedAddress] = useState<IAddress>(
    {} as IAddress
  );

  useEffect(() => {
    let check = addresses.find((address) => address.active === true);
    if (check) {
      setSelectedAddress(check);
    } else {
      setSelectedAddress({} as IAddress);
    }
  }, [addresses]);

  return (
    <div className="flex flex-col gap-3">
      <Shipping
        // selectedAddress={selectedAddress}
        // setSelectedAddress={setSelectedAddress}
        user={user as IUser}
        addresses={addresses}
        setAddresses={setAddresses}
      />
      <CheckoutCart cart={cart} />
      <Payment
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />
      <Summary
        totalAfterDiscount={totalAfterDiscount}
        setTotalAfterDiscount={setTotalAfterDiscount}
        user={user as IUser}
        cart={cart}
        paymentMethod={paymentMethod}
        selectedAddress={selectedAddress}
      />
    </div>
  );
};

export default Checkout;

"use client";
import { Checkout } from "@/components/checkout";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import { useSession } from "next-auth/react";

const CheckoutPage = () => {
  const { data: session, status } = useSession();

  const { data, error, isLoading } = useSWRFetch(
    `/api/user/cart/${session?.user?.uid}`
  );
  if (isLoading) return <div>loading...</div>;
  if (error) {
    console.log("errors : ", error);
    return <div>error</div>;
  }
  return (
    <div>
      <Checkout cart={data.cart} user={data.user} />
    </div>
  );
};

export default CheckoutPage;

import ICart, { ICartProduct } from "@/types/db/cart";
import IUser, { IAddress } from "@/types/db/user";
import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { TextBox } from "../inputs";
import { CouponInputTypes } from "@/types/validation/coupon";
import { Button } from "../ui/button";
import { applyCoupon } from "@/lib/functions/shipping";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/functions/order";

type SummaryPropsTypes = {
  totalAfterDiscount: string;
  setTotalAfterDiscount: React.Dispatch<React.SetStateAction<string>>;
  user: IUser;
  cart: ICart;
  paymentMethod: string;
  selectedAddress: IAddress;
};

const Summary = ({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress,
}: SummaryPropsTypes) => {
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [orderError, setOrderError] = useState<string>("");
  const router = useRouter();
  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Coupon is required"),
  });
  const applyCouponHandler = async () => {
    console.log("summary.tsx applyCouponHandler");
    if (coupon == "") {
      setDiscount("");
      setTotalAfterDiscount("");
      return;
    }
    const res = await applyCoupon(coupon);
    if (res.message) {
      console.log("res.message : ", res.message);
      setError(res.message);
    } else {
      console.log("res.discount : ", res.discount);
      setDiscount(res.discount);
      setTotalAfterDiscount(res.totalAfterDiscount);
      setError("");
    }
  };
  const placeOrderHandler = async () => {
    console.log("summary.tsx placeOrderHandler");
    if (paymentMethod == "") {
      setOrderError("Please select a payment method");
      return;
    } else if (!selectedAddress) {
      setOrderError("Please select a shipping address");
      return;
    }
    try {
      const res = await createOrder(
        cart,
        selectedAddress,
        paymentMethod,
        totalAfterDiscount,
        coupon
      );
      console.log("placeOrderHandler : ", res);
      router.push(`/order/${res.order_id}`);
    } catch (error: any) {
      console.log("placeOrderHandler : error : ", error.response.data.message);
      setOrderError(error.response.data.message);
    }
  };
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ coupon }}
        validationSchema={validateCoupon}
        onSubmit={() => applyCouponHandler()}
      >
        {(props: FormikProps<CouponInputTypes>) => (
          <Form>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <TextBox
                  type="text"
                  label="Coupon"
                  name="coupon"
                  placeholder="Coupon Code"
                  onChange={(e: any) => setCoupon(e.target.value)}
                  iconName="this property currently not used"
                  className={cn("", { "border border-red-400": error != "" })}
                />
                <span className={cn("hidden text-sm", { block: error != "" })}>
                  {error && <span className="text-red-500">*{error}</span>}
                </span>
              </div>

              <Button type="submit" className="">
                Apply
              </Button>
            </div>

            <div className="flex flex-col mt-2">
              <div className="flex gap-2">
                <span>Total :</span>
                <span>{cart.cartTotal.toFixed(2)}</span>
              </div>
              {Number(discount) > 0 && (
                <div className="flex gap-2">
                  <span>Coupon Applied :</span>
                  <span className="text-green-500 font-semibold">
                    -{discount}%
                  </span>
                </div>
              )}
              {totalAfterDiscount != "" &&
                Number(totalAfterDiscount) < Number(cart.cartTotal) && (
                  <div className="flex gap-2">
                    <span>Total After Discount :</span>
                    <span>{totalAfterDiscount}</span>
                  </div>
                )}
            </div>
          </Form>
        )}
      </Formik>

      <div className="mt-2">
        <Button type="submit" className="" onClick={() => placeOrderHandler()}>
          Place Order
        </Button>
      </div>
      {orderError && <span className="text-red-500">*{orderError}</span>}
    </div>
  );
};

export default Summary;

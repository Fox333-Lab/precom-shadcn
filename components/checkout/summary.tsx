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
import { H4, H5 } from "../ui/textui";

type SummaryPropsTypes = {
  totalAfterDiscount: string;
  setTotalAfterDiscount: React.Dispatch<React.SetStateAction<string>>;
  user: IUser;
  cart: ICart;
  paymentMethod: string;
  selectedAddress: IAddress;
  className?: string;
};

const Summary = ({
  totalAfterDiscount,
  setTotalAfterDiscount,
  user,
  cart,
  paymentMethod,
  selectedAddress,
  className,
}: SummaryPropsTypes) => {
  const [coupon, setCoupon] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [orderError, setOrderError] = useState<string>("");
  const router = useRouter();
  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Coupon is required"),
  });
  const total = Number(cart.cartTotal) + Number(cart.shippingFee);
  const applyCouponHandler = async () => {
    console.log("In summary.tsx applyCouponHandler");
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
        coupon,
      );
      console.log("placeOrderHandler : ", res);
      router.push(`/order/${res.order_id}`);
    } catch (error: any) {
      console.log("placeOrderHandler : error : ", error.response.data.message);
      setOrderError(error.response.data.message);
    }
  };

  console.log("totalAfterDiscount :>> ", totalAfterDiscount);
  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <Formik
        enableReinitialize
        initialValues={{ coupon }}
        validationSchema={validateCoupon}
        onSubmit={() => applyCouponHandler()}
      >
        {(props: FormikProps<CouponInputTypes>) => (
          <Form>
            <div className="flex items-end gap-3">
              <div className="flex flex-1 flex-col gap-1">
                <TextBox
                  type="text"
                  label="Coupon"
                  name="coupon"
                  placeholder="Coupon Code"
                  onChange={(e: any) => setCoupon(e.target.value)}
                  iconName="this property currently not used"
                  className={cn("", { "border border-red-400": error != "" })}
                />
                {/* <span className={cn("hidden text-sm", { block: error != "" })}>
                  {error && <span className="text-red-500">*{error}</span>}
                </span> */}
              </div>

              <Button type="submit" className="">
                Apply
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <div className="mt-2 flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span>Total :</span>
          <H5>{total.toFixed(2)}</H5>
        </div>
        {Number(discount) > 0 && (
          <div className="flex items-center gap-2">
            <span>Coupon Applied :</span>
            <H5 className="text-green-500">-{discount}%</H5>
          </div>
        )}

        {totalAfterDiscount &&
          totalAfterDiscount != "" &&
          Number(totalAfterDiscount) < Number(total) && (
            <div className="flex items-center gap-2">
              <span>Total After Discount :</span>
              <H5>{totalAfterDiscount}</H5>
            </div>
          )}
      </div>
      <div className="mt-2">
        <Button type="submit" size="full" onClick={() => placeOrderHandler()}>
          Place Order
        </Button>
      </div>
      {orderError && <span className="text-red-500">*{orderError}</span>}
    </div>
  );
};

export default Summary;

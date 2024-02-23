import ICart from "@/types/db/cart";
import IUser, { IAddress } from "@/types/db/user";
import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { TextBox } from "../inputs";
import { CouponInputTypes } from "@/types/validation/coupon";
import { Button } from "../ui/button";
import { applyCoupon } from "@/lib/functions/shipping";

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
  const validateCoupon = Yup.object({
    coupon: Yup.string().required("Coupon is required"),
  });
  const applyCouponHandler = async () => {
    console.log("Coupon Applied");
    const res = await applyCoupon(coupon);
    if (res.message) {
      setError(res.error);
    } else {
      setDiscount(res.discount);
      setTotalAfterDiscount(res.totalAfterDiscount);
      setError("");
    }
  };
  const placeHolderHandler = async () => {
    console.log("Place Order");
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
            <div className="flex flex-col gap-5">
              <TextBox
                type="text"
                label="Coupon"
                name="coupon"
                placeholder="Coupon Code"
                onChange={(e: any) => setCoupon(e.target.value)}
                iconName="this icon currently not used"
              />
              <Button type="submit" className="">
                Apply
              </Button>
            </div>

            <div>
              <span>Total :</span>
              <span>{cart.cartTotal.toFixed()}</span>
              {Number(discount) > 0 && (
                <span>Coupon Applied : -{discount}%</span>
              )}
              {totalAfterDiscount != "" &&
                Number(totalAfterDiscount) < Number(cart.cartTotal) && (
                  <span>Total After Discount : {totalAfterDiscount}</span>
                )}
            </div>
            <Button
              type="submit"
              className=""
              onClick={() => placeHolderHandler()}
            >
              Place Order
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Summary;

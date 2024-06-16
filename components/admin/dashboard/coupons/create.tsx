"use client";
import { DatePicker, TextBox } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { DATE_FORMAT_DDMMYYYY } from "@/lib/constants/date";
import { createCoupon } from "@/lib/functions/admin/coupons";
import ICoupon from "@/types/db/coupon";
import { AddCouponInputTypes } from "@/types/validation/admin/dashboard/coupon";
import { addDays, format } from "date-fns";
import { Form, Formik, FormikProps } from "formik";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

type CreateCouponPropsTypes = {
  setCoupons: React.Dispatch<React.SetStateAction<ICoupon[]>>;
};

const Create = ({ setCoupons }: CreateCouponPropsTypes) => {
  const [couponName, setCouponName] = useState("");
  const [discount, setDiscount] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const couponValidation = Yup.object({
    coupon: Yup.string()
      .required("Enter coupon name")
      .min(4, "Coupon length should be more than 3 characters")
      .max(10, "Coupon name length should not exceed 10 characters")
      .matches(/^[a-z0-9]+$/i, "Special chars not allowed in coupon name"),
    discount: Yup.number()
      .required("Enter discount value")
      .min(1, "Discount value should be more than 0")
      .max(99, "Discount value should be less than 100"),
    startDate: Yup.date()
      .required("Enter start date")
      .min(addDays(new Date(), -1), "Cannot select a past date"),
    endDate: Yup.date()
      .required("Enter expiry date")
      .min(Yup.ref("startDate"), "Expiry date should be more than start date"),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCouponName(value);
  };
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDiscount(Number(value));
  };
  const AddCouponHandler = async () => {
    console.log("inside AddCouponHandler");
    try {
      console.log("startDate : ", startDate, "endDate : ", endDate);
      if (startDate === undefined || endDate === undefined) {
        return;
      }
      const couponStartDate = format(startDate, DATE_FORMAT_DDMMYYYY);
      const couponEndDate = format(endDate, DATE_FORMAT_DDMMYYYY);
      const res = await createCoupon(
        couponName,
        discount,
        couponStartDate,
        couponEndDate
      );
      console.log("create coupon res : ", res?.coupons);
      if (res?.coupons) {
        setCoupons(res.coupons);
        setCouponName("");
        setDiscount(1);
        setStartDate("");
        setEndDate("");
      }
    } catch (error: any) {
      console.log("22 error : ", error.response.data.message);
    }
  };
  const resetHandler = () => {
    setCouponName("");
    setDiscount(1);
    setStartDate("");
    setEndDate("");
  };
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ coupon: couponName, discount, startDate, endDate }}
        validationSchema={couponValidation}
        onSubmit={AddCouponHandler}
      >
        {(props: FormikProps<AddCouponInputTypes>) => (
          <Form>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <TextBox
                  type="text"
                  // label="New Password"
                  placeholder="Coupon Name"
                  iconName=""
                  name="coupon"
                  onChange={handleChange}
                  dstyles="w-full"
                />
                <TextBox
                  type="number"
                  min="1"
                  max="99"
                  name="discount"
                  placeholder="58"
                  onChange={handleDiscountChange}
                  dstyles="w-full"
                  // readOnly
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between gap-5">
                <DatePicker
                  handleChange={setStartDate}
                  value={startDate}
                  name="startDate"
                  placeholder="Pick a start date"
                  dstyles="w-full"
                />
                <DatePicker
                  handleChange={setEndDate}
                  value={endDate}
                  name="endDate"
                  placeholder="Pick a expiry date"
                  dstyles="w-full"
                />
              </div>

              <div className="flex flex-1 gap-2">
                <Button type="submit" className="cursor-pointer flex gap-2">
                  <Plus size={18} />
                  <span>Add Coupon</span>
                </Button>
                <Button
                  type="button"
                  className="cursor-pointer flex gap-2"
                  onClick={resetHandler}
                >
                  <RefreshCcw size={18} />
                  <span>Reset</span>
                </Button>
              </div>

              <div>
                {/* {error && <span className="text-red-600">{error}</span>}
                {success && <span className="text-green-600">{success}</span>} */}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;

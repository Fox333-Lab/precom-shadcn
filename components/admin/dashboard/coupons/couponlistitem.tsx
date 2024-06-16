import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/datepicker";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { DATE_FORMAT_DDMMYYYY } from "@/lib/constants/date";
import { deleteCoupon, updateCoupon } from "@/lib/functions/admin/coupons";
import { cn, validateAlphabetsAndNumbers } from "@/lib/utils";
import ICoupon from "@/types/db/coupon";
import { format, parse } from "date-fns";
import { CircleOff, Edit, Save, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type CouponListItemPropsTYpes = {
  coupon: ICoupon;
  setCoupons: React.Dispatch<React.SetStateAction<ICoupon[]>>;
};

const CouponListItem = ({ coupon, setCoupons }: CouponListItemPropsTYpes) => {
  const [open, setOpen] = useState(false);
  const [couponName, setCouponName] = useState(coupon.coupon.toString());
  const [discount, setDiscount] = useState(coupon.discount.toString());
  const [startDate, setStartDate] = useState(coupon.startDate.toString());
  const [endDate, setEndDate] = useState(coupon.endDate.toString());
  const [error, setError] = useState("");
  const [discountError, setDiscountError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  let origCouponVal: string = coupon.coupon.toString();
  let origCouponDiscount: string = coupon.discount.toString();
  let origCouponStartDate: string = coupon.startDate.toString();
  let origCouponEndDate: string = coupon.endDate.toString();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setCouponName(value);
  };
  const handleStartDateChange = (val: string) => {
    console.log("start val : ", val);
    val = format(val, DATE_FORMAT_DDMMYYYY);
    console.log("formatted start val : ", val);
    setStartDate(val);
  };
  const handleEndDateChange = (val: string) => {
    console.log("end val : ", val);
    val = format(val, DATE_FORMAT_DDMMYYYY);
    console.log("formatted end val : ", val);
    setEndDate(val);
  };
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setDiscount(value);
  };
  // update coupon handler
  const saveHandler = async (couponID: string) => {
    try {
      console.log("categoryID : ", couponID);
      let updatedCouponName = couponName
        ? couponName
        : coupon.coupon.toString();
      const couponNameValidation = await validateAlphabetsAndNumbers(
        updatedCouponName,
        "Invalid coupon name"
      );
      console.log("nameValidation : ", couponNameValidation);
      if (couponNameValidation.isInputValid === false) {
        setError(couponNameValidation.message);
        console.log("nameValidation err : ", couponNameValidation);
        return;
      }
      if (Number(discount) === 0) {
        console.log("Discount should be more than 0");
        setDiscountError("Discount should be more than 0");
        return;
      } else if (Number(discount) >= 100) {
        console.log("Discount should be less than 100");
        setDiscountError("Discount should be less than 100");
        return;
      }
      // if condition to check if start date is less than end date
      console.log("startDate : ", startDate, "endDate : ", endDate);
      const startDateValidation = parse(
        startDate,
        DATE_FORMAT_DDMMYYYY,
        new Date()
      );
      const endDateValidation = parse(
        endDate,
        DATE_FORMAT_DDMMYYYY,
        new Date()
      );
      console.log(
        "startDateValidation : ",
        startDateValidation,
        "endDateValidation : ",
        endDateValidation
      );
      if (startDateValidation > endDateValidation) {
        console.log("Start date should be less than end date");
        setStartDateError("Start date should be less than end date");
        setEndDateError("End date should be more than start date");
        return;
      }

      const res = await updateCoupon(
        couponID,
        updatedCouponName,
        discount,
        startDate,
        endDate
      );
      console.log("category saveHandler res : ", res);
      //setCategories(res.categories);
      if (res?.success) {
        setOpen(false);
        const updatedDiscount = Number(discount);
        setCoupons((prev) =>
          prev.map((item) => {
            if (item._id === coupon._id) {
              return {
                ...item,
                coupon: updatedCouponName,
                discount: updatedDiscount,
                startDate,
                endDate,
              };
            }
            return item;
          })
        );
        origCouponVal = couponName;
        origCouponDiscount = discount;
        origCouponStartDate = startDate;
        origCouponEndDate = endDate;
        setError("");
        setDiscountError("");
        setStartDateError("");
        setEndDateError("");
        toast.success(res?.message);
      } else {
        console.log("category saveHandler res : ", res);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  // delete handler
  const removeHandler = async (couponID: string) => {
    try {
      console.log("couponID : ", couponID);
      const res = await deleteCoupon(couponID);
      console.log("category removeHandler res : ", res);
      //setCategories(res.categories);
      if (res?.success) {
        setCoupons((prev) => prev.filter((item) => item._id !== coupon._id));
        toast.success(res?.message);
      }
      setError("");
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex flex-col gap-0.5">
            <Input
              type="text"
              value={couponName ? couponName : coupon.coupon.toString()}
              name="name"
              onChange={handleChange}
              disabled={!open}
              // ref={input}
              className={cn("bg-transparent border-none", {
                "bg-background border border-input": open,
                "outline outline-1 outline-red-600": error != "" && open,
              })}
              // readOnly
            />
            {error && (
              <span className="text-red-600 text-sm ml-0.5">{error}</span>
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-0.5">
            <Input
              type="number"
              value={
                discount ? discount.toString() : coupon.discount.toString()
              }
              min="1"
              max="99"
              name="discount"
              onChange={handleDiscountChange}
              disabled={!open}
              // ref={input}
              className={cn("bg-transparent border-none", {
                "bg-background border border-input": open,
                "outline outline-1 outline-red-600":
                  discountError != "" && open,
              })}
              // readOnly
            />
            {discountError && (
              <span className="text-red-600 text-sm ml-0.5">
                {discountError}
              </span>
            )}
          </div>
          {/* {coupon.discount.toString()} */}
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-0.5">
            <DatePicker
              handleChange={handleStartDateChange}
              value={startDate ? startDate : coupon.startDate.toString()}
              name="startDate"
              dstyles={cn("w-full")}
              bstyles={cn("bg-transparent border-none", {
                "bg-background border border-input": open,
                "outline outline-1 outline-red-600":
                  startDateError != "" && open,
              })}
              placeholder="Pick a start date"
              disabled={!open}
            />
            {startDateError && (
              <span className="text-red-600 text-sm ml-0.5">
                {startDateError}
              </span>
            )}
          </div>
          {/* {coupon.startDate.toString()} */}
        </TableCell>
        <TableCell>
          <div className="flex flex-col gap-0.5">
            <DatePicker
              handleChange={handleEndDateChange}
              value={endDate ? endDate : coupon.endDate.toString()}
              name="endDate"
              dstyles={cn("w-full")}
              bstyles={cn("bg-transparent border-none", {
                "bg-background border border-input": open,
                "outline outline-1 outline-red-600": endDateError != "" && open,
              })}
              disabled={!open}
            />
            {endDateError && (
              <span className="text-red-600 text-sm ml-0.5">
                {endDateError}
              </span>
            )}
          </div>
          {/* {coupon.endDate.toString()} */}
        </TableCell>
        <TableCell>
          <div className="flex gap-1 justify-end items-center">
            <Button
              variant="ghost"
              type="button"
              size="icon"
              onClick={() => {
                if (open) {
                  if (origCouponVal !== couponName) {
                    setCouponName(origCouponVal);
                  }
                  if (origCouponDiscount !== discount) {
                    setDiscount(origCouponDiscount);
                  }
                  if (origCouponStartDate !== startDate) {
                    setStartDate(origCouponStartDate);
                  }
                  if (origCouponEndDate !== endDate) {
                    setEndDate(origCouponEndDate);
                  }
                }
                setOpen((prev) => !prev);
                setError("");
                setDiscountError("");
                setStartDateError("");
                setEndDateError("");
                // input?.current?.focus(); // currently focus not working
              }}
            >
              {open ? <CircleOff /> : <Edit />}
            </Button>
            <Button
              variant="ghost"
              type="button"
              size="icon"
              onClick={() => removeHandler(coupon._id.toString())}
            >
              <Trash2 />
            </Button>
            <Button
              variant="ghost"
              type="button"
              size="icon"
              disabled={!open}
              onClick={() => saveHandler(coupon._id.toString())}
            >
              <Save />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CouponListItem;

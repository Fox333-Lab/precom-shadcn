import db from "@/lib/db";
import Category from "@/models/db/category";
import Coupon from "@/models/db/coupon";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/coupons/GET");
  try {
    await db.ConnectDB();
    const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
    if (!coupons) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "No coupons found" },
        { status: 404 }
      );
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/coupons/GET disconnected");
    return NextResponse.json({ coupons }, { status: 200 });
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/coupons/GET failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/coupons/POST file");
  try {
    const { couponName, discount, startDate, endDate } = await req.json();
    await db.ConnectDB();
    const coupon = await Coupon.findOne({ coupon: couponName });
    if (coupon) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Coupon already exist" },
        { status: 400 }
      );
    }
    const newCoupon = await new Coupon({
      coupon: couponName,
      discount,
      startDate,
      endDate,
    }).save();
    if (!newCoupon) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Coupon creation failed" },
        { status: 400 }
      );
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/coupons/POST disconnected");
    return NextResponse.json(
      {
        message: `Coupon ${couponName} added successfully`,
        coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/coupons/POST failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/coupons/PUT");
  try {
    const { couponID, couponName, discount, startDate, endDate } =
      await req.json();
    await db.ConnectDB();
    const coupon = await Coupon.findById(couponID);
    if (!coupon) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Coupon not found" },
        { status: 404 }
      );
    }
    coupon.coupon = couponName;
    coupon.discount = Number(discount);
    coupon.startDate = startDate;
    coupon.endDate = endDate;
    const savedCoupon = await coupon.save();
    if (!savedCoupon) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Coupon update failed" },
        { status: 400 }
      );
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/categories/PUT disconnected");
    return NextResponse.json(
      {
        message: `Coupon updated successfully`,
        success: true,
        // categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/categories/PUT failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  console.log("In the api/admin/dashboard/coupons/DELETE file");
  try {
    const { couponID } = await req.json();
    await db.ConnectDB();
    const deletedCoupon = await Coupon.findByIdAndDelete(couponID);
    if (!deletedCoupon) {
      await db.DisconnectDB();
      return NextResponse.json(
        { message: "Coupon deletion failed" },
        { status: 400 }
      );
    }
    await db.DisconnectDB();
    console.log("api/admin/dashboard/coupons/DELETE disconnected");
    return NextResponse.json(
      {
        message: `Coupon ${deletedCoupon.coupon} deleted successfully`,
        success: true,
        // categories: await Category.find({}).sort({ updatedAt: -1 }),
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log(
      "catch : api/admin/dashboard/coupons/DELETE failed : ",
      err.message
    );
    await db.DisconnectDB();
    return NextResponse.json(
      { message: err.message, success: false },
      { status: 500 }
    );
  }
};

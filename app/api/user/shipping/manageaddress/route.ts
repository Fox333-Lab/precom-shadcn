import User from "@/models/db/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { IAddress } from "@/types/db/user";
import db from "@/lib/db";

export const PUT = async (req: NextRequest) => {
  console.log("in api/user/manageaddress put request");
  const userSession = await getServerSession(authOptions);
  try {
    console.log("in api/user/manageaddress userSession : ", userSession);
    const userId = userSession?.user.uid;
    await db.ConnectDB();
    let { addressId }: { addressId: string } = await req.json();
    console.log("in api/user/manageaddress put request Id : ", addressId);
    // console.log("in api/user/manageaddress userId : ", userId);
    const user = await User.findById(userId);
    let addresses: IAddress[] = [];
    console.log("in api/user/manageaddress put request Id after addresses ");
    if (user) {
      // console.log("in api/user/manageaddress user : ", user);
      let userExistingAddresses: IAddress[] = user.address;
      userExistingAddresses.forEach((address: IAddress) => {
        let tempAddress: IAddress = {} as IAddress;
        if (address._id.toString() === addressId) {
          tempAddress = { ...address, active: true };
          addresses.push(tempAddress);
        } else {
          tempAddress = { ...address, active: false };
          addresses.push(tempAddress);
        }
      });
      user.address = addresses;
      await user.save();
    }
    // console.log("in api/user/manageaddress address 1 : ", address);
    console.log("in api/user/manageaddress put request Id after save");
    console.log(
      "in api/user/manageaddress put request Id : addresses : ",
      user.address
    );
    await db.DisconnectDB();
    return new NextResponse(JSON.stringify({ addresses: user.address }), {
      status: 200,
    });
  } catch (err: any) {
    await db.DisconnectDB();
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};

export const DELETE = async (req: NextRequest) => {
  console.log("in api/user/manageaddress DELETE request");
  const userSession = await getServerSession(authOptions);
  try {
    console.log(
      "in api/user/manageaddress DELETE request userSession : ",
      userSession
    );
    const userId = userSession?.user.uid;
    await db.ConnectDB();
    let { addressId } = await req.json();
    console.log(
      "in api/user/manageaddress DELETE request addressId : ",
      addressId
    );
    // console.log("in api/user/manageaddress userId : ", userId);
    const user = await User.findById(userId);
    console.log("in api/user/manageaddress DELETE request Id after addresses ");
    if (user) {
      // console.log("in api/user/manageaddress user : ", user);
      user.address.pull({ _id: addressId });
      await user.save();
    }
    // console.log("in api/user/manageaddress address 1 : ", address);
    console.log("in api/user/manageaddress DELETE request Id after save");
    console.log(
      "in api/user/manageaddress DELETE request Id : addresses : ",
      user.address
    );
    await db.DisconnectDB();
    return new NextResponse(JSON.stringify({ addresses: user.address }), {
      status: 200,
    });
  } catch (err: any) {
    await db.DisconnectDB();
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};

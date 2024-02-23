import User from "@/models/db/user";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { IAddress } from "@/types/db/user";
import mongoose from "mongoose";
import db from "@/lib/db";

export const PUT = async (req: NextRequest) => {
  console.log("in api/user/saveaddresstodb post request");
  const userSession = await getServerSession(authOptions);
  try {
    // console.log("in api/user/saveaddresstodb userSession : ", userSession);
    const userId = userSession?.user.uid;
    await db.ConnectDB();
    let { newAddress }: { newAddress: IAddress } = await req.json();
    // console.log("in api/user/saveaddresstodb address : ", address);
    // console.log("in api/user/saveaddresstodb userId : ", userId);
    const user = await User.findById(userId);
    let addresses: IAddress[] = [];
    console.log("in api/user/manageaddress put request Id after addresses ");
    if (user) {
      // console.log("in api/user/manageaddress user : ", user);
      let userExistingAddresses: IAddress[] = user.address;
      userExistingAddresses.forEach((address: IAddress) => {
        let tempAddress: IAddress = {} as IAddress;

        tempAddress = { ...address, active: false };
        addresses.push(tempAddress);
      });
      user.address = addresses;
      newAddress = {
        ...newAddress,
        _id: new mongoose.Types.ObjectId(),
        active: true,
      };
      user.address.push(newAddress);
      await user.save();
    }
    // if (user) {

    //   newAddress = {
    //     ...newAddress,
    //     _id: new mongoose.Types.ObjectId(),
    //     active: true,
    //   };
    //   user.address.push(newAddress);
    //   await user.save();
    // }
    // console.log("in api/user/saveaddresstodb address 1 : ", address);
    console.log("in api/user/saveaddresstodb after save");
    await db.DisconnectDB();
    return new NextResponse(JSON.stringify({ addresses: user.address }), {
      status: 200,
    });
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};

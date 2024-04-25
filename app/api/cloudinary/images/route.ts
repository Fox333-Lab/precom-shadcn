import cloudinary from "cloudinary";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib";

// Configure Cloudinary with your credentials
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

export const POST = async (req: NextRequest) => {
  console.log("In the api/cloudinary/images POST");
  try {
    // await db.ConnectDB();
    const formData = await req.formData();
    const imagePath = formData.get("path") as string;
    const imageFile = formData.getAll("file") as unknown as File[];
    console.log("imageFile : ", imageFile);
    console.log("imagePath : ", imagePath);
    let files = Object.values(formData.getAll("file")).flat();
    let images = [];
    console.log("files : ", files);
    for (let i = 0; i < files.length; i++) {
      const file = files[i] as File;
      const img = await uploadImage(file, imagePath);
      images.push(img);
    }
    // await db.DisconnectDB();
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    console.log("catch : api/cloudinary/images failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

export const DELETE = async (req: NextRequest) => {
  console.log("In the api/cloudinary/images DELETE");
  try {
    // await db.ConnectDB();
    let { imageId } = await req.json();
    if (imageId) {
      let result = await cloudinary.v2.uploader.destroy(imageId);
      console.log("result : ", result);
    }
    // await db.DisconnectDB();
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (err: any) {
    console.log("catch : api/cloudinary/images failed : ", err.message);
    await db.DisconnectDB();
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
};

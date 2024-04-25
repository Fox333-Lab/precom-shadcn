import cloudinary from "cloudinary";

export const uploadImage = async (file: File, path: string) => {
  const imageBuffer = await file.arrayBuffer();
  const bytes = Buffer.from(imageBuffer);
  return new Promise(async (resolve, reject) => {
    await cloudinary.v2.uploader
      .upload_stream(
        { resource_type: "image", folder: path },
        async (error, result) => {
          if (error) {
            console.error("Error uploading image:", error);
            return reject(error.message);
          } else {
            return resolve(result);
          }
        }
      )
      .end(bytes);
  });
};

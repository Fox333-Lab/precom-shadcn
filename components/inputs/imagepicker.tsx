import { ErrorMessage, useField } from "formik";
import React, { Dispatch, SetStateAction, useRef } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Palette, Trash2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { Colors } from ".";

type ImagePickerPropsTypes = {
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
  header: string;
  text: string;
  //   name: string;
  setColorImage: Dispatch<SetStateAction<string>>;
  props: any;
};

const ImagePicker = ({
  images,
  setImages,
  header,
  label,
  //   name,
  setColorImage,
  product,
  setProduct,
  colorImage,
  ...props
}: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [field, meta] = useField(props);
  // console.log("images : ", images);

  // resetting the file input element when state has no length
  console.log("initial images.length : ", images.length);
  if (images.length <= 0) {
    if (fileInputRef.current) fileInputRef.current.value = "";
  }
  const handleImages = (e: any) => {
    let files = Array.from(e.target.files);
    // console.log("files : ", files);
    if (files) {
      files.forEach((file: any, i: number) => {
        if (i > 4 || images.length > 5) {
          files = files.filter((f) => f !== file.name);
          toast.error("Maximum 5 images allowed");
          return;
        }
        if (
          file.type !== "image/jpeg" &&
          file.type !== "image/jpg" &&
          file.type !== "image/png"
        ) {
          toast.error("Only jpg, jpeg, png files allowed");
          files = files.filter((f) => f !== file.name);
          return;
        } else if (file.size > 1024 * 1024 * 5) {
          toast.error("Maximum file size is 5MB");
          files = files.filter((f) => f !== file.name);
          return;
        } else {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = (e: any) => {
            console.log("e.target.result : ", e.target.result);
            setImages((images: any) => [...images, e.target.result]);
          };
        }
      });
    }
  };
  const removeImageHandler = (image: any) => {
    console.log("removeImageHandler images  before : ", images);
    setImages(images.filter((im: any) => im !== image));
    console.log("removeImageHandler images after : ", images);
    if (image === colorImage) {
      setColorImage("");
    }
  };
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-2 border-dashed p-3 rounded-md dark:border-gray-600"
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-2 rounded-md p-3 bg-opacity-5 bg-no-repeat bg-center bg-contain min-h-25 border border-dashed dark:border-gray-600",
          {
            "bg-[url(/images/svgs/imagepluslight.svg)] dark:bg-[url(/images/svgs/imageplus.svg)]":
              images.length <= 0,
          }
        )}
        // before:content-[*] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url(/images/svgs/imageup.svg)] before:opacity-100 before:-z-1
      >
        <>
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 justify-evenly">
              {images.map((image: any, i: number) => (
                <div
                  key={i}
                  className={cn(
                    "group relative border rounded-md dark:border-gray-600 bg-no-repeat bg-center bg-contain overflow-hidden flex items-center justify-center w-28 h-28"
                  )}
                  style={{ backgroundImage: `url(${image})` }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hidden group-hover:flex rounded-full"
                    onClick={() => removeImageHandler(image)}
                  >
                    <Trash2 className="" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hidden group-hover:flex rounded-full"
                    onClick={() => setColorImage(image)}
                  >
                    <Palette className="" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
        <div>
          <Colors
            name="color"
            product={product}
            setProduct={setProduct}
            colorImage={colorImage}
          />
        </div>
      </div>
      <div>
        <input
          type="file"
          id="pimages"
          name={field.name}
          multiple
          hidden
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleImages}
          // disabled={images.length > 5}
          ref={fileInputRef}
        />
        <Button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className=""
          size="full"
        >
          <div className="flex items-center gap-1">
            <UploadCloud size={22} />
            <span>{label}</span>
          </div>
        </Button>
        {meta.touched && meta.error && (
          <div className="text-red-600">
            <span className="text-sm ml-0.5">
              <ErrorMessage name={field.name} />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePicker;

import { ErrorMessage, useField } from "formik";
import React, { useRef } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Trash2, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

const StylePicker = ({
  product,
  setProduct,
  styleImage,
  setStyleImage,
  ...props
}: any) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [field, meta] = useField(props);
  const handleImage = (e: any) => {
    let file = e.target.files[0];
    console.log("StylePicker file : ", file);
    console.log("StylePicker product : ", product);
    if (file) {
      if (
        file.type !== "image/jpeg" &&
        file.type !== "image/jpg" &&
        file.type !== "image/png"
      ) {
        toast.error("Only jpg, jpeg, png files allowed");
        return;
      } else if (file.size > 1024 * 1024 * 5) {
        toast.error("Maximum file size is 5MB");
        return;
      } else {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e: any) => {
          // console.log("e.target.result : ", e.target.result);
          let colorObj = {
            color: product.color.color,
            image: e.target.result,
          };
          setStyleImage(e.target.result);
          setProduct({
            ...product,
            color: colorObj,
          });
        };
      }
    }
  };
  const removeImageHandler = () => {
    setStyleImage("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-2 border-dashed p-3 rounded-md dark:border-gray-600"
      )}
    >
      <div
        className={cn(
          "rounded-md p-3 bg-opacity-5 bg-no-repeat bg-center bg-contain min-h-25 border border-dashed dark:border-gray-600",
          {
            "bg-[url(/images/svgs/imagepluslight.svg)] dark:bg-[url(/images/svgs/imageplus.svg)]":
              styleImage == "",
          }
        )}
        // before:content-[*] before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-[url(/images/svgs/imageup.svg)] before:opacity-100 before:-z-1
      >
        {styleImage && (
          <div className="flex flex-wrap gap-4 justify-evenly">
            <div
              className={cn(
                "group relative border rounded-md dark:border-gray-600 bg-no-repeat bg-center bg-contain overflow-hidden flex items-center justify-center w-28 h-28"
              )}
              style={{ backgroundImage: `url(${styleImage})` }}
            >
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hidden group-hover:flex rounded-full"
                onClick={removeImageHandler}
              >
                <Trash2 className="" />
              </Button>
            </div>
          </div>
        )}
      </div>
      <div>
        <input
          type="file"
          id="pimages"
          name={field.name}
          hidden
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleImage}
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
            <span>Upload style</span>
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

export default StylePicker;

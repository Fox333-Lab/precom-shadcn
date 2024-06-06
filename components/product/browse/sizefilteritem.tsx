import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { sanitizeFilter } from "mongoose";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

type SizeFilterItemProps = {
  size: any;
  sizeFilterHandler: (size: string) => void;
  checkChecked: (queryName: string, value: string) => boolean;
};

const SizeFilterItem = ({
  size,
  sizeFilterHandler,
  checkChecked,
}: SizeFilterItemProps) => {
  const searchParams = useSearchParams();
  const [check, setCheck] = useState(checkChecked("size", size));
  let existingSize = searchParams.get("size");
  let arrSizes: string[] = existingSize?.split("_") ?? [];
  console.log("existingSize : ", existingSize);
  console.log("size : ", size);
  // let searchSizes = existingSize ? `${existingSize}_${size}` : size;
  // console.log("searchSizes : ", searchSizes);

  // let selectedSizes: string[] =
  //   existingSize != null && existingSize != "" ? existingSize.split("_") : [];
  // console.log("first selectedSizes : ", selectedSizes);
  // let selectedSizeExist =
  //   selectedSizes?.length > 0 ? selectedSizes.includes(size) : false;
  // console.log("first selectedSizeExist : ", selectedSizeExist);

  const checkChangeHandler = (e: any, size: any) => {
    console.log("e.target.checked : ", e);
    console.log("e.target.checked : ", size);
    console.log("arrSizes : ", arrSizes);
    setCheck(e);
    if (arrSizes.length > 0) {
      if (e == false) {
        console.log("first arrSizes : ", arrSizes);
        arrSizes = arrSizes?.filter((arrSize) => arrSize !== size);
      } else {
        console.log("first arrSizes : ", arrSizes);
        console.log("e.target.checked : ", size);
        arrSizes?.push(size);
      }
    } else {
      console.log("first arrSizes : ", arrSizes);
      console.log("e.target.checked : ", size);
      arrSizes?.push(size);
    }
    console.log("arrSizes : ", arrSizes);
    let searchSizes = arrSizes.join("_");
    console.log("first searchSizes : ", searchSizes);
    sizeFilterHandler(searchSizes);
    // if (selectedSizeExist) {
    //   selectedSizes = selectedSizes.filter((selectedSize) => selectedSize !== size);
    // } else {
    //   selectedSizes.push(size);
    // }
    // console.log("selectedSizes : ", selectedSizes);
    // searchSizes = selectedSizes.join("_");
    // console.log("searchSizes : ", searchSizes);
  };

  return (
    <li className="pt-2.5 flex gap-2 items-center">
      <Checkbox
        id={size}
        name={size}
        value={size}
        // checked={selectedSizeExist}
        checked={check}
        onCheckedChange={(e) => checkChangeHandler(e, size)}
        // onCheckedChange={() => sizeFilterHandler(searchSizes)}
      />
      <Label htmlFor={size}>{size}</Label>
    </li>
  );
};

export default SizeFilterItem;

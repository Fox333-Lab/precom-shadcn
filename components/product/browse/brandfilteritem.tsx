import { ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";

type BrandFilterItemProps = {
  brand: any;
  brandFilterHandler: (brand: string) => void;
};

const BrandFilterItem = ({
  brand,
  brandFilterHandler,
}: BrandFilterItemProps) => {
  return (
    // <li className="p-2 border rounded-sm">
    <ToggleGroupItem value={brand} onClick={() => brandFilterHandler(brand)}>
      {/* <button onClick={() => brandFilterHandler(brand)}>{brand}</button> */}
      {brand}
    </ToggleGroupItem>
    // </li>
  );
};

export default BrandFilterItem;

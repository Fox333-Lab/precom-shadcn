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
    <li className="p-2 border rounded-sm">
      <button onClick={() => brandFilterHandler(brand)}>{brand}</button>
    </li>
  );
};

export default BrandFilterItem;

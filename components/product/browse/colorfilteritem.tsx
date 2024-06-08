import { ToggleGroupItem } from "@/components/ui/toggle-group";
import React from "react";

type ColorFilterItemProps = {
  color: any;
  colorFilterHandler: (color: string) => void;
};

const ColorFilterItem = ({
  color,
  colorFilterHandler,
}: ColorFilterItemProps) => {
  return (
    // <li className="pt-2">
    //   <button
    //     className={`size-6 rounded-full hover:outline outline-1 border-2 border-white focus:outline`}
    //     style={{ backgroundColor: `${color}`, outlineColor: `${color}` }}
    //   ></button>
    // </li>
    <ToggleGroupItem
      value={color}
      className={`hover:bg-transparent rounded-full`}
      size="none"
      variant="rounded"
      onClick={() => colorFilterHandler(color)}
    >
      <div
        className={`size-6 z-999 rounded-full outline-1 hover:outline border-2 border-white focus:outline`}
        style={{ backgroundColor: `${color}`, outlineColor: `${color}` }}
      ></div>
    </ToggleGroupItem>
    // <ToggleGroupItem value={brand} onClick={() => brandFilterHandler(brand)}></ToggleGroupItem>
  );
};

export default ColorFilterItem;

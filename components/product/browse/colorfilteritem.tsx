import React from "react";

type ColorFilterItemProps = {
  color: any;
};

const ColorFilterItem = ({ color }: ColorFilterItemProps) => {
  return (
    <li className="pt-2">
      <button
        className={`size-6 rounded-full hover:outline outline-1 border-2 border-white focus:outline`}
        style={{ backgroundColor: `${color}`, outlineColor: `${color}` }}
      ></button>
    </li>
  );
};

export default ColorFilterItem;

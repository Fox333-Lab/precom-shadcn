import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import React from "react";

type StyleFilterItemProps = {
  style: any;
};

const StyleFilterItem = ({ style }: StyleFilterItemProps) => {
  return (
    <li className="pt-2.5 flex gap-2 items-center">
      <Checkbox id={style} name="size" value={style} />
      <Label htmlFor={style}>{style}</Label>
    </li>
  );
};

export default StyleFilterItem;

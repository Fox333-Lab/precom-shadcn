import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { useSearchParams } from "next/navigation";
import React from "react";

type CategoryFilterItemProps = {
  category: any;
  subcategories: any;
  categoryFilterHandler: (category: string) => void;
  checkChecked: (queryName: string, value: string) => boolean;
};

const CategoryFilterItem = ({
  category,
  subcategories,
  categoryFilterHandler,
  checkChecked,
}: CategoryFilterItemProps) => {
  // const searchParams = useSearchParams();
  const check = checkChecked("category", category._id.toString());
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem
        value={category.name}
        id={category._id}
        // checked={searchParams.get("category") == category._id.toString()}
        checked={check}
        onClick={() => {
          {
            console.log("check : ", check);
            categoryFilterHandler(check ? "" : category._id.toString());
          }
        }}
      />
      <Label htmlFor={category._id}>{category.name}</Label>
    </div>
  );
};

export default CategoryFilterItem;

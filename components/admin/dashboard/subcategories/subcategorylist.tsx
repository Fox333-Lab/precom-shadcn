import ICategory from "@/types/db/category";
import React from "react";
import { SubCategoryListItem } from ".";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ISubCategory from "@/types/db/subcategory";

type SubCategoryListPropsTypes = {
  subCategories: ISubCategory[];
  setSubCategories: React.Dispatch<React.SetStateAction<ISubCategory[]>>;
  categories: ICategory[];
};

const SubCategoryList = ({
  subCategories,
  setSubCategories,
  categories,
}: SubCategoryListPropsTypes) => {
  console.log("SubCategoryList subCategories : ", subCategories);
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subCategories.map((subCategory) => (
            <SubCategoryListItem
              key={subCategory._id.toString()}
              subCategory={subCategory}
              setSubCategories={setSubCategories}
              categories={categories}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SubCategoryList;

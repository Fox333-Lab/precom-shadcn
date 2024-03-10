import ICategory from "@/types/db/category";
import React from "react";
import { CategoryListItem } from ".";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type CategoryListPropsTypes = {
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
};

const CategoryList = ({
  categories,
  setCategories,
}: CategoryListPropsTypes) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <CategoryListItem
              key={category._id.toString()}
              category={category}
              setCategories={setCategories}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CategoryList;

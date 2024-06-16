import React, { useState } from "react";
import { SubCategoryList, Create } from ".";
import ISubCategory from "@/types/db/subcategory";
import ICategory from "@/types/db/category";

type SubCategoriesPropsTypes = {
  subCategories: ISubCategory[];
  categories: ICategory[];
};

const SubCategories = ({
  subCategories,
  categories,
}: SubCategoriesPropsTypes) => {
  const [data, setData] = useState(subCategories);
  return (
    <div className="flex flex-col gap-6">
      <Create setSubCategories={setData} categories={categories} />
      <SubCategoryList
        subCategories={data}
        setSubCategories={setData}
        categories={categories}
      />
    </div>
  );
};

export default SubCategories;

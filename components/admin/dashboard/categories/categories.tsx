import ICategory from "@/types/db/category";
import React, { useState } from "react";
import { CategoryList, Create } from ".";

const Categories = ({ categories }: { categories: ICategory[] }) => {
  const [data, setData] = useState(categories);
  return (
    <div className="flex flex-col gap-6">
      <Create setCategories={setData} />
      <CategoryList categories={data} setCategories={setData} />
    </div>
  );
};

export default Categories;

"use client";
import { SubCategories } from "@/components/admin/dashboard/subcategories";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/textui";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import React from "react";

const SubCategoriesPage = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/subcategories`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  console.log("subcategories page - data.subCategories : ", data.subCategories);
  console.log("subcategories page - data.categories : ", data.categories);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <H3>Create a sub-category</H3>
        <Separator />
      </div>
      <SubCategories
        categories={data.categories}
        subCategories={data.subCategories}
      />
    </div>
  );
};

export default SubCategoriesPage;

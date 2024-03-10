"use client";
import { Categories } from "@/components/admin/dashboard/categories";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/textui";
import { useSWRFetch } from "@/lib/hooks/usefetch";
import React from "react";

const CategoriesPage = () => {
  const { data, error, isLoading } = useSWRFetch(
    `/api/admin/dashboard/categories`
  );
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;
  console.log("categories page : ", data.categories);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <H3>Create a category</H3>
        <Separator />
      </div>
      <Categories categories={data.categories} />
    </div>
  );
};

export default CategoriesPage;

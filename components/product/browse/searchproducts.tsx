"use client";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { TextBox } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { SearchInputTypes } from "@/types/validation/search";

const searchValidation = Yup.object({
  query: Yup.string().required("enter product name"),
});

const SearchProducts = ({ searchHandler, searchQuery }: any) => {
  const [query, setQuery] = useState(searchQuery);
  const [success, setSuccess] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();
  const path = usePathname();
  console.log("path : ", path);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery(value);
  };
  const SearchHandler = async () => {
    // e.preventDefault();
    try {
      if (path !== "/products") {
        console.log("first path : ", path);
        router.push(`/products?search=${query}`);
      } else {
        console.log("searchHandler(query) : ", query);
        searchHandler(query);
      }
    } catch (error: any) {}
  };
  return (
    <Formik
      enableReinitialize
      initialValues={{
        query,
      }}
      validationSchema={searchValidation}
      onSubmit={SearchHandler}
    >
      {(props: FormikProps<SearchInputTypes>) => (
        <Form>
          <div className="flex w-full items-center space-x-2">
            <TextBox
              type="text"
              label=""
              placeholder="search products..."
              iconName=""
              name="query"
              onChange={handleChange}
              value={query}
            />
            <Button type="submit" variant="outline" size="icon">
              <SearchIcon />
            </Button>
          </div>
          <div>
            {error && <span className="text-red-600">{error}</span>}
            {success && <span className="text-green-600">{success}</span>}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SearchProducts;

"use client";
import * as Yup from "yup";
import { Form, Formik, FormikProps } from "formik";
import React, { useState } from "react";
import { TextBox } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SearchInputTypes } from "@/types/validation/search";

const searchValidation = Yup.object({
  query: Yup.string().required("enter product name"),
});

const SearchProducts = ({ searchQuery }: any) => {
  // const SearchProducts = ({ searchHandler, searchQuery }: any) => {
  const [query, setQuery] = useState(searchQuery);
  const searchParams = useSearchParams(); // added for making search independent
  const [success, setSuccess] = useState("");
  const [error, seterror] = useState("");
  const router = useRouter();
  const path = usePathname();
  console.log("path : ", path);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setQuery(value);
  };
  const filterSearchHandler = ({ search }: any) => {
    console.log("filterHandler");
    const params = new URLSearchParams(searchParams);
    // const path = pathname;
    console.log("path : ", path);
    // search query starts here
    if (search) {
      console.log("first search : ", search);
      params.set("search", search);
    } else if (search == "") {
      console.log("delete");
      params.delete("search");
    }
    console.log("params.toString() : ", params.toString());
    router.push(`${path}?${params.toString()}`, { scroll: false });
  };
  const searchHandler = (search: string) => {
    filterSearchHandler({ search });
  };
  const OnSubmitHandler = async () => {
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
      onSubmit={OnSubmitHandler}
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
              showErrorMsg={false}
              className="w-96 shrink rounded-full border-none bg-slate-100 px-5 transition-all focus:bg-transparent dark:bg-slate-600 lg:block"
            />
            <Button type="submit" variant="outline" size="icon" rounded="full">
              <SearchIcon size="18" className="text-primary" />
            </Button>
          </div>
          {/* <div>
            {error && <span className="text-red-600">{error}</span>}
            {success && <span className="text-green-600">{success}</span>}
          </div> */}
        </Form>
      )}
    </Formik>
  );
};

export default SearchProducts;

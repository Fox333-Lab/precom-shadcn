"use client";

import { TextBox } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { createCategory } from "@/lib/functions/admin/categories";
import ICategory from "@/types/db/category";
import { AddCategoryInputTypes } from "@/types/validation/admin/dashboard/addcategory";
import { Form, Formik, FormikProps } from "formik";
import { Plus } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

type CreateCategoryPropsTypes = {
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
};

const Create = ({ setCategories }: { setCategories: any }) => {
  const [name, setName] = useState("");
  const categoryValidation = Yup.object({
    name: Yup.string()
      .required("Enter category name")
      .min(3, "Category length should be more than 2 characters")
      .max(30, "Category name length should not exceed 30 characters")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Numbers and special chars not allowed in category name"
      ),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setName(value);
  };
  const AddcategoryHandler = async () => {
    try {
      const res = await createCategory(name);
      console.log("create category res : ", res.categories);
      if (res?.categories) {
        setCategories(res.categories);
        setName("");
      }
    } catch (error: any) {
      console.log("22 error : ", error.response.data.message);
    }
  };
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ name }}
        validationSchema={categoryValidation}
        onSubmit={AddcategoryHandler}
      >
        {(props: FormikProps<AddCategoryInputTypes>) => (
          <Form>
            <div className="flex flex-col gap-5">
              <TextBox
                type="text"
                // label="New Password"
                placeholder="Category Name"
                iconName=""
                name="name"
                onChange={handleChange}
              />
              <div className="flex flex-1 gap-2">
                <Button type="submit" className="cursor-pointer flex gap-2">
                  <Plus />
                  <span>Add Category</span>
                </Button>
                <Button
                  type="button"
                  className="cursor-pointer"
                  onClick={() => setName("")}
                >
                  Reset
                </Button>
              </div>

              <div>
                {/* {error && <span className="text-red-600">{error}</span>}
                {success && <span className="text-green-600">{success}</span>} */}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;

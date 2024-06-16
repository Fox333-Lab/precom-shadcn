"use client";

import { SingularSelect, TextBox } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib";
import { createSubCategory } from "@/lib/functions/admin/subcategories";
import ICategory from "@/types/db/category";
import ISubCategory from "@/types/db/subcategory";
import {
  AddCategoryInputTypes,
  AddSubCategoryInputTypes,
} from "@/types/validation/admin/dashboard/category";
import { Form, Formik, FormikProps } from "formik";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import * as Yup from "yup";

type CreateSubCategoryPropsTypes = {
  setSubCategories: React.Dispatch<React.SetStateAction<ISubCategory[]>>;
  categories: ICategory[];
};

const Create = ({
  setSubCategories,
  categories,
}: CreateSubCategoryPropsTypes) => {
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const subCategoryValidation = Yup.object({
    name: Yup.string()
      .required("Enter sub-category name")
      .min(3, "Sub-Category length should be more than 2 characters")
      .max(30, "Sub-Category name length should not exceed 30 characters")
      .matches(
        /^[a-zA-Z\s]*$/,
        "Numbers and special chars not allowed in sub-category name"
      ),
    parent: Yup.string().required("Select a category"),
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setName(value);
  };
  const handleSelectChange = (value: string) => {
    console.log(value);
    setParent(value);
  };
  const AddSubCategoryHandler = async () => {
    console.log("Inside AddSubCategoryHandler");
    console.log("name : ", name);
    console.log("parent : ", parent);
    try {
      const res = await createSubCategory(name, parent);
      console.log("create subcategory res : ", res.subCategories);
      if (res?.success && res?.subCategories) {
        console.log("resetting 1");
        setSubCategories(res.subCategories);
        setName("");
        setParent("");
      }
    } catch (error: any) {
      console.log("22 error : ", error.response.data.message);
    }
  };
  const resetHandler = () => {
    setName("");
    setParent("");
  };
  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={{ name, parent }}
        validationSchema={subCategoryValidation}
        onSubmit={AddSubCategoryHandler}
      >
        {(props: FormikProps<AddSubCategoryInputTypes>) => (
          <Form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <TextBox
                  type="text"
                  // label="New Password"
                  placeholder="Sub-Category Name"
                  iconName=""
                  name="name"
                  onChange={handleChange}
                />
                <SingularSelect
                  name="parent"
                  value={name}
                  placeholder="category"
                  handleChange={handleSelectChange}
                  data={categories}
                />
              </div>
              <div className="flex flex-1 gap-2">
                <Button type="submit" className="cursor-pointer flex gap-2">
                  <Plus size={18} />
                  <span>Add Sub-Category</span>
                </Button>
                <Button
                  type="button"
                  className="cursor-pointer flex gap-2"
                  onClick={resetHandler}
                >
                  <RefreshCcw size={18} />
                  <span>Reset</span>
                </Button>
              </div>

              {/* <div>
                {error && <span className="text-red-600">{error}</span>}
                {success && <span className="text-green-600">{success}</span>}
              </div> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Create;

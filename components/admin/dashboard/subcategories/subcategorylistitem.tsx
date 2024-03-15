import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  deleteSubCategory,
  updateSubCategory,
} from "@/lib/functions/admin/subcategories";
import { cn, validateAlphabetsOnly } from "@/lib/utils";
import ICategory from "@/types/db/category";
import ISubCategory from "@/types/db/subcategory";
import { CircleOff, Edit, Save, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";

type CategoryListItemPropsTYpes = {
  subCategory: ISubCategory;
  setSubCategories: React.Dispatch<React.SetStateAction<ISubCategory[]>>;
  categories: ICategory[];
};

const SubCategoryListItem = ({
  subCategory,
  setSubCategories,
  categories,
}: CategoryListItemPropsTYpes) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [error, setError] = useState("");
  console.log("SubCategoryListItem subCategory : ", subCategory);
  let origCategoryVal: string = subCategory.parent?._id?.toString();
  let origSubCatVal: string = subCategory.name.toString();
  const input = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setName(value);
  };
  const handleSelectChange = (value: string) => {
    console.log(value);
    setParent(value);
  };
  const saveHandler = async (subCategoryID: string) => {
    try {
      console.log("subCategoryID : ", subCategoryID);
      const nameValidation = await validateAlphabetsOnly(
        name ? name : subCategory.name.toString(),
        "Invalid sub-category name"
      );
      console.log("nameValidation : ", nameValidation);
      if (nameValidation.isInputValid === false) {
        setError(nameValidation.message);
        console.log("nameValidation err : ", nameValidation);
        return;
      }
      let subCategoryName = name ? name : subCategory.name.toString();
      let subCategoryParent = parent
        ? parent
        : subCategory.parent._id.toString();
      // let subCategoryParentObjID = new ObjectId(subCategoryParent);
      const res = await updateSubCategory(
        subCategoryID,
        subCategoryName,
        subCategoryParent
      );
      console.log("sub-category saveHandler res : ", res);
      console.log("res?.subCategories : ", res?.subCategories);
      //setCategories(res.categories);
      if (res?.success) {
        setOpen(false);
        // setSubCategories((prev) =>
        //   prev.map((item) => {
        //     if (item._id === subCategory._id) {
        //       return {
        //         ...item,
        //         name: subCategoryName,
        //         slug: res?.updatedSlug,
        //         // parent: subCategoryParent,
        //       };
        //     }
        //     return item;
        //   })
        // );
        setSubCategories(res?.subCategories);
        origCategoryVal = subCategoryParent;
        origSubCatVal = subCategoryName;
        setError("");
      } else {
        console.log("sub-category saveHandler res : ", res);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  const removeHandler = async (subCategoryID: string) => {
    try {
      console.log("subCategoryID : ", subCategoryID);
      const res = await deleteSubCategory(subCategoryID);
      console.log("sub-category removeHandler res : ", res);
      //setCategories(res.categories);
      if (res?.success) {
        setSubCategories((prev) =>
          prev.filter((item) => item._id !== subCategory._id)
        );
      }
      setError("");
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <div className="flex flex-col gap-0.5">
            <Input
              type="text"
              value={name ? name : subCategory.name.toString()}
              name="name"
              onChange={handleChange}
              disabled={!open}
              // ref={input}
              className={cn("bg-transparent border-none", {
                "bg-background border border-input": open,
                "outline outline-1 outline-red-600": error != "" && open,
              })}
              data-title={error && open ? error : ""}
              // readOnly
            />
            {error && (
              <span className="text-red-600 text-sm ml-0.5">{error}</span>
            )}
          </div>
        </TableCell>
        <TableCell>{subCategory.slug}</TableCell>
        <TableCell>
          <Select
            name="parent"
            // onValueChange={field.onChange(() => handleChange)}
            onValueChange={handleSelectChange}
            value={parent ? parent : subCategory.parent?._id?.toString()}
            disabled={!open}
          >
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              {/* <SelectGroup>
            <SelectLabel>-- Countries --</SelectLabel> */}
              {categories.map((category: any) => {
                return (
                  <SelectItem
                    key={category._id.toString()}
                    value={category._id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                );
              })}
              {/* </SelectGroup> */}
            </SelectContent>
          </Select>
        </TableCell>
        <TableCell>
          <div className="flex gap-1 justify-end items-center">
            <Button
              variant="ghost"
              type="button"
              size="icon"
              onClick={() => {
                if (open) {
                  if (origCategoryVal !== parent) {
                    setParent(origCategoryVal);
                  }
                  if (origSubCatVal !== name) {
                    setName(origSubCatVal);
                  }
                }
                setOpen((prev) => !prev);
                setError("");
                // input?.current?.focus(); // currently focus not working
              }}
            >
              {open ? <CircleOff /> : <Edit />}
            </Button>
            <Button
              variant="ghost"
              type="button"
              size="icon"
              onClick={() => removeHandler(subCategory._id.toString())}
            >
              <Trash2 />
            </Button>
            <Button
              variant="ghost"
              type="button"
              size="icon"
              disabled={!open}
              onClick={() => saveHandler(subCategory._id.toString())}
            >
              <Save />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default SubCategoryListItem;

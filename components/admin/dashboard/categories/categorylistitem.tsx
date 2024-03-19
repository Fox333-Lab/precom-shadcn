import { TextBox } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  deleteCategory,
  updateCategory,
} from "@/lib/functions/admin/categories";
import { cn, validateAlphabetsOnly } from "@/lib/utils";
import ICategory from "@/types/db/category";
import { CircleOff, Edit, Save, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

type CategoryListItemPropsTYpes = {
  category: ICategory;
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
};

const CategoryListItem = ({
  category,
  setCategories,
}: CategoryListItemPropsTYpes) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  let origCategoryVal: string = category.name.toString();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setName(value);
  };
  const saveHandler = async (categoryID: string) => {
    try {
      console.log("categoryID : ", categoryID);
      const nameValidation = await validateAlphabetsOnly(
        name ? name : category.name.toString(),
        "Invalid category name"
      );
      console.log("nameValidation : ", nameValidation);
      if (nameValidation.isInputValid === false) {
        setError(nameValidation.message);
        console.log("nameValidation err : ", nameValidation);
        return;
      }
      const res = await updateCategory(categoryID, name);
      console.log("category saveHandler res : ", res);
      //setCategories(res.categories);
      if (res.success) {
        setOpen(false);
        setCategories((prev) =>
          prev.map((item) => {
            if (item._id === category._id) {
              return { ...item, name, slug: res.updatedSlug };
            }
            return item;
          })
        );
        origCategoryVal = name;
        setError("");
        toast.success(res?.message);
      } else {
        console.log("category saveHandler res : ", res);
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  const removeHandler = async (categoryID: string) => {
    try {
      console.log("categoryID : ", categoryID);
      const res = await deleteCategory(categoryID);
      console.log("category removeHandler res : ", res);
      //setCategories(res.categories);
      if (res?.success) {
        setCategories((prev) =>
          prev.filter((item) => item._id !== category._id)
        );
        toast.success(res?.message);
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
              value={name ? name : category.name.toString()}
              name="name"
              onChange={handleChange}
              disabled={!open}
              // ref={input}
              className={cn("bg-transparent border-none", {
                "bg-background border border-input": open,
                "outline outline-1 outline-red-600": error != "" && open,
              })}
              // readOnly
            />
            {error && (
              <span className="text-red-600 text-sm ml-0.5">{error}</span>
            )}
          </div>
        </TableCell>
        <TableCell>{category.slug}</TableCell>
        <TableCell>
          <div className="flex gap-1 justify-end items-center">
            <Button
              variant="ghost"
              type="button"
              size="icon"
              onClick={() => {
                if (open) {
                  if (origCategoryVal !== name) {
                    setName(origCategoryVal);
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
              onClick={() => removeHandler(category._id.toString())}
            >
              <Trash2 />
            </Button>
            <Button
              variant="ghost"
              type="button"
              size="icon"
              disabled={!open}
              onClick={() => saveHandler(category._id.toString())}
            >
              <Save />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CategoryListItem;

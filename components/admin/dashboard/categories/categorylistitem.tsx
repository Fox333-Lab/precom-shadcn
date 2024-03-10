import { TextBox } from "@/components/inputs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import ICategory from "@/types/db/category";
import { Edit, Save, Trash2 } from "lucide-react";
import React, { useRef, useState } from "react";

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
  const input = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setName(value);
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <Input
            type="text"
            value={name ? name : category.name.toString()}
            name="name"
            onChange={handleChange}
            disabled={!open}
            ref={input}
            className="bg-transparent border-none"
            // readOnly
          />
        </TableCell>
        <TableCell>{category.slug}</TableCell>
        <TableCell>
          <div className="flex gap-1 justify-end items-center">
            <Button
              variant="ghost"
              type="button"
              size="icon"
              onClick={() => {
                setOpen((prev) => !prev);
                console.log("input : ", input);
                input?.current?.focus(); // currently focus not working
              }}
            >
              <Edit />
            </Button>
            <Button variant="ghost" type="button" size="icon">
              <Trash2 />
            </Button>
            <Button variant="ghost" type="button" size="icon">
              <Save />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default CategoryListItem;

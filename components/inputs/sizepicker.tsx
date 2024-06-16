import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { MinusCircle, PlusCircle } from "lucide-react";

const SizePicker = ({ sizes, product, setProduct }: any) => {
  const [noSize, setNoSize] = useState(false);
  const handleSize = (e: any, i: number) => {
    const { name, value } = e.target;
    const newSizes = [...sizes];
    newSizes[i][name] = value;
    setProduct({ ...product, sizes: newSizes });
  };
  const handleSelectChangeSize = (value: string, name: string, i: number) => {
    const newSizes = [...sizes];
    newSizes[i][name] = value;
    setProduct({ ...product, sizes: newSizes });
  };
  const handleRemove = (i: number) => {
    if (sizes.length > 1) {
      const newSizes = [...sizes];
      newSizes.splice(i, 1);
      setProduct({ ...product, sizes: newSizes });
    }
  };
  console.log("product sizes : ", product.sizes);
  return (
    <div>
      <Button
        type="button"
        variant="outline"
        onClick={() => {
          if (!noSize) {
            let sizeSata: any = sizes.map((size: any) => {
              return { qty: size.qty, price: size.price };
            });
            setProduct({ ...product, sizes: sizeSata });
          } else {
            let sizeSata: any = sizes.map((size: any) => {
              return {
                size: size.size || "",
                qty: size.qty,
                price: size.price,
              };
            });
            setProduct({ ...product, sizes: sizeSata });
          }

          setNoSize((prev) => !prev);
        }}
      >
        {noSize ? "click if product has size" : "click if product has no size"}
      </Button>
      {sizes
        ? sizes.map((size: any, i: number) => (
            <div className="flex gap-4 items-center mt-2" key={i}>
              <Select
                name="size"
                value={noSize ? "" : size.size}
                disabled={noSize}
                onValueChange={(e: any) => handleSelectChangeSize(e, "size", i)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {/* <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel> */}
                  <SelectItem value="XS">XS</SelectItem>
                  <SelectItem value="S">S</SelectItem>
                  <SelectItem value="M">M</SelectItem>
                  <SelectItem value="L">L</SelectItem>
                  <SelectItem value="XL">XL</SelectItem>
                  {/* </SelectGroup> */}
                </SelectContent>
              </Select>
              <Input
                type="number"
                name="qty"
                placeholder={noSize ? "Product Quantity" : "Size Quantity"}
                min={1}
                value={size.qty}
                onChange={(e) => handleSize(e, i)}
              />
              <Input
                type="number"
                name="price"
                placeholder={noSize ? "Product Price" : "Size Price"}
                min={1}
                value={size.price}
                onChange={(e) => handleSize(e, i)}
              />
              {!noSize ? (
                <>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemove(i)}
                  >
                    <MinusCircle />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setProduct({
                        ...product,
                        sizes: [...sizes, { size: "", qty: "", price: "" }],
                      });
                    }}
                  >
                    <PlusCircle />
                  </Button>
                </>
              ) : (
                ""
              )}
            </div>
          ))
        : null}
    </div>
  );
};

export default SizePicker;

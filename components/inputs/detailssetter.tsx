import React, { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { MinusCircle, PlusCircle } from "lucide-react";
import { H5 } from "../ui/textui";

const DetailsSetter = ({ details, product, setProduct }: any) => {
  const handleDetails = (e: any, i: number) => {
    const { name, value } = e.target;
    const newDetails = [...details];
    newDetails[i][name] = value;
    setProduct({ ...product, details: newDetails });
  };

  const handleRemove = (i: number) => {
    if (details.length > 0) {
      const newDetails = [...details];
      newDetails.splice(i, 1);
      setProduct({ ...product, details: newDetails });
    }
  };
  console.log("product details : ", product.details);
  return (
    <div>
      {details.length <= 0 ? (
        <Button
          type="button"
          variant="ghost"
          size="default"
          className="flex items-center gap-2"
          onClick={() => {
            setProduct({
              ...product,
              details: [...details, { name: "", value: "" }],
            });
          }}
        >
          <PlusCircle /> <span>Add Details</span>
        </Button>
      ) : (
        <H5>Details</H5>
      )}
      {details
        ? details.map((detail: any, i: number) => (
            <div className="flex gap-4 items-center mt-2" key={i}>
              <Input
                type="text"
                name="name"
                placeholder="name"
                value={detail.name}
                onChange={(e) => handleDetails(e, i)}
              />
              <Input
                type="text"
                name="value"
                placeholder="value"
                value={detail.value}
                onChange={(e) => handleDetails(e, i)}
              />

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
                      details: [...details, { name: "", value: "" }],
                    });
                  }}
                >
                  <PlusCircle />
                </Button>
              </>
            </div>
          ))
        : null}
    </div>
  );
};

export default DetailsSetter;

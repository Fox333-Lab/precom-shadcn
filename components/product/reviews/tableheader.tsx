"use client";
import { useState } from "react";
import TableSelect from "./tableselect";

const TableHeader = ({ allSizes, colors }: any) => {
  const [size, setSize] = useState("");
  const [style, setStyle] = useState("");
  const [rating, setRating] = useState(0);
  const [order, setOrder] = useState("");
  const ratings = [
    { text: "All", value: "" },
    { text: "1 star", value: 1 },
    { text: "2 star", value: 2 },
    { text: "3 star", value: 3 },
    { text: "4 star", value: 4 },
    { text: "5 star", value: 5 },
  ];
  const sortOrder = [
    { text: "Recommended", value: "Recommended" },
    { text: "Most recent to oldest", value: "Most recent to oldest" },
    { text: "Oldest to most recent", value: "Oldest to most recent" },
  ];
  console.log("size:", size);
  return (
    <div className="flex gap-2">
      <TableSelect
        property={size}
        text="Size"
        data={allSizes.filter((x: any) => x.size !== size)}
        handleChange={setSize}
      />
      <TableSelect
        property={style}
        text="Style"
        data={colors.filter((x: any) => x !== style)}
        handleChange={setStyle}
      />
      <TableSelect
        property={rating}
        text="Rating"
        data={ratings.filter((x) => x.value !== rating)}
        handleChange={setRating}
      />
      <TableSelect
        property={order}
        text="Order"
        data={sortOrder.filter((x) => x.value !== order)}
        handleChange={setOrder}
      />
    </div>
  );
};

export default TableHeader;

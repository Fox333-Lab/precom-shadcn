import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

type TableSelectProps = {
  property: any;
  text: string;
  data: any;
  handleChange:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<number>>;
};

const TableSelect = ({
  property,
  text,
  data,
  handleChange,
}: TableSelectProps) => {
  console.log("reviews/select : data : ", data);
  console.log("reviews/select : text : ", text);
  return (
    <div className="mt-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <label
            tabIndex={0}
            className="m-1 w-[150px] flex justify-between items-center"
          >
            <span>
              {text == "Size" || text == "Rating" || text == "Order" ? (
                property || `Select ${text}`
              ) : text == "Style" && property.image ? (
                <div
                  style={{ backgroundImage: `URL(${property.image})` }}
                  className="h-8 w-8 rounded-full bg-no-repeat bg-cover bg-center"
                ></div>
              ) : property.color ? (
                <div
                  style={{ backgroundColor: `${property.color}` }}
                  className="h-8 w-8 rounded-full"
                ></div>
              ) : text == "Fit" && property ? (
                property
              ) : !property && text == "Fit" ? (
                "Fit"
              ) : (
                "select style"
              )}
            </span>
            <ChevronDown size={18} />
          </label>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {data.map((item: any, i: number) => {
            if (text == "Size") {
              return (
                <DropdownMenuItem key={i}>
                  <div
                    onClick={() => handleChange(item.size.toString())}
                    className="w-full bg-red-400"
                  >
                    <span>{item.size}</span>
                  </div>
                </DropdownMenuItem>
              );
            }
            if (text == "Style") {
              return (
                <DropdownMenuItem key={i}>
                  <div
                    onClick={() => handleChange(item)}
                    style={{ backgroundColor: `${item.color}` }}
                    className="flex items-center justify-center w-full"
                  >
                    {item.image == "" && item.color == "" ? (
                      <div>All</div>
                    ) : (
                      <div
                        style={{ backgroundImage: `URL(${item.image})` }}
                        className="h-8 w-8 rounded-full bg-no-repeat bg-cover bg-center"
                      ></div>
                    )}
                  </div>
                </DropdownMenuItem>
              );
            }
            if (text == "Fit") {
              return (
                <DropdownMenuItem key={i}>
                  <div onClick={() => handleChange(item)} className="w-full">
                    <span>{item}</span>
                  </div>
                </DropdownMenuItem>
              );
            }
            if (text == "Rating") {
              return (
                <DropdownMenuItem key={i}>
                  <div
                    onClick={() => handleChange(item.value)}
                    className="bg-green-400 w-full"
                  >
                    <span>{item.text}</span>
                  </div>
                </DropdownMenuItem>
              );
            }
            if (text == "Order") {
              return (
                <DropdownMenuItem key={i}>
                  <div
                    onClick={() => handleChange(item.value)}
                    className="bg-purple-400 w-full"
                  >
                    <span>{item.text}</span>
                  </div>
                </DropdownMenuItem>
              );
            }
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <div className="dropdown">
        <label tabIndex={0} className="btn m-1 w-[150px] flex justify-between">
          <span>
            {text == "Size" || text == "Rating" || text == "Order" ? (
              property || `Select ${text}`
            ) : text == "Style" && property.image ? (
              <div
                style={{ backgroundImage: `URL(${property.image})` }}
                className="h-8 w-8 rounded-full bg-no-repeat bg-cover bg-center"
              ></div>
            ) : property.color ? (
              <div
                style={{ backgroundColor: `${property.color}` }}
                className="h-8 w-8 rounded-full"
              ></div>
            ) : text == "Fit" && property ? (
              property
            ) : !property && text == "Fit" ? (
              "Fit"
            ) : (
              "select style"
            )}
          </span>
          <ChevronDown />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content z-[200] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          {data.map((item: any, i: number) => {
            if (text == "Size") {
              return (
                <li
                  key={i}
                  onClick={() => handleChange(item.size)}
                  className="h-10"
                >
                  <span>{item.size}</span>
                </li>
              );
            }
            if (text == "Style") {
              return (
                <li
                  key={i}
                  onClick={() => handleChange(item)}
                  style={{ backgroundColor: `${item.color}` }}
                  className="h-10 items-center flex justify-center"
                >
                  {item.image == "" && item.color == "" ? (
                    "All"
                  ) : (
                    <div
                      style={{ backgroundImage: `URL(${item.image})` }}
                      className="h-8 w-8 rounded-full bg-no-repeat bg-cover bg-center"
                    ></div>
                  )}
                </li>
              );
            }
            if (text == "Fit") {
              return (
                <li key={i} onClick={() => handleChange(item)} className="h-10">
                  <span>{item}</span>
                </li>
              );
            }
            if (text == "Rating") {
              return (
                <li
                  key={i}
                  onClick={() => handleChange(item.value)}
                  className="h-10"
                >
                  <span>{item.text}</span>
                </li>
              );
            }
            if (text == "Order") {
              return (
                <li
                  key={i}
                  onClick={() => handleChange(item.value)}
                  className="h-10"
                >
                  <span>{item.text}</span>
                </li>
              );
            }
          })}
        </ul>
      </div> */}
      {/* <div className="">
        <span>{property || `Select ${text}`}</span>
      </div> */}
    </div>
  );
};

export default TableSelect;

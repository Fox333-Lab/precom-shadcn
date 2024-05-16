import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Select = ({ property, text, data, handleChange }: any) => {
  console.log("reviews/select : data : ", data);
  return (
    <div className="mt-5">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <label
            tabIndex={0}
            className="m-1 w-[150px] flex justify-between items-center"
          >
            <span>
              {text == "Size" ? (
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
                    onClick={() => handleChange(item.size)}
                    className="w-full"
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
                    className="h-10 w-full items-center flex justify-center"
                  >
                    <div
                      style={{ backgroundImage: `URL(${item.image})` }}
                      className="h-8 w-8 rounded-full bg-no-repeat bg-cover bg-center"
                    ></div>
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
          })}
        </DropdownMenuContent>
      </DropdownMenu>
      {/* <div className="">
        <span>{property || `Select ${text}`}</span>
      </div> */}
    </div>
  );
};

export default Select;

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { format, getMonth, parse } from "date-fns";
import { Calendar } from "./calendar";
import { DATE_FORMAT_DDMMYYYY } from "@/lib/constants/date";

const DatePicker = ({
  handleChange,
  placeholder,
  dstyles,
  bstyles,
  value,
  name,
  disabled,
  ...props
}: any) => {
  value = parse(value, DATE_FORMAT_DDMMYYYY, new Date());
  const selectedMonth = getMonth(value) + 1;
  return (
    <div className={cn(dstyles)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "justify-start text-left font-normal",
              !value && "text-muted-foreground",
              bstyles
            )}
            disabled={disabled}
            name={name}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            //selected={date}
            selected={value}
            onSelect={handleChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;

import { ErrorMessage, useField } from "formik";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const DatePicker = ({ handleChange, placeholder, dstyles, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div className={cn(dstyles)}>
      {/* Shadcn select - starts */}
      {/* <div className="relative">
        <Select
          name={field.name}
          // onValueChange={field.onChange(() => handleChange)}
          onValueChange={handleChange}
          value={field.value}
        >
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {/* <SelectGroup>
            <SelectLabel>-- Countries --</SelectLabel> * /}
            {data.map((country: { name: string; code: string }) => (
              <SelectItem key={country.name} value={country.name.toString()}>
                {country.name}
              </SelectItem>
            ))}
            {/* </SelectGroup> * /}
          </SelectContent>
        </Select> 
      </div>*/}
      {/* ----------------------------- */}
      <div className="relative">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "pl-3 text-left font-normal w-full",
                !field.value && "text-muted-foreground"
              )}
              name={field.name}
            >
              {field.value ? (
                format(field.value, "PPP")
              ) : (
                <span>{placeholder}</span>
              )}
              <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              // onSelect={field.onChange}
              onSelect={handleChange}
              disabled={(date) =>
                // date > new Date() || date < new Date("1900-01-01")
                date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      {/* ------------------------------ */}
      {meta.touched && meta.error && (
        <div className="text-red-600">
          <span className="text-sm ml-0.5">
            <ErrorMessage name={field.name} />
          </span>
        </div>
      )}
    </div>
  );
};

export default DatePicker;

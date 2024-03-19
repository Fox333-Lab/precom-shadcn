import { ErrorMessage, useField } from "formik";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SingularSelect = ({ data, handleChange, placeholder, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      {/* Shadcn select - starts */}
      <div className="relative">
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
            <SelectLabel>-- Countries --</SelectLabel> */}
            {data.map((country: { name: string; code: string }) => (
              <SelectItem key={country.name} value={country.name.toString()}>
                {country.name}
              </SelectItem>
            ))}
            {/* </SelectGroup> */}
          </SelectContent>
        </Select>
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-600">
          <span className="text-sm">
            <ErrorMessage name={field.name} />
          </span>
        </div>
      )}
    </div>
  );
};

export default SingularSelect;

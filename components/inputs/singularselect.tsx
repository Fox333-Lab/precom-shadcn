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
      {/* <select
        className="select select-bordered w-full max-w-xs"
        id="demo-simple-select-helper"
        value={field.value}
        name={field.name}
        onChange={handleChange}
      >
        {data.map((country) => (
          <option key={country.name} value={country.name}>
            {country.name}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <p>
          <ErrorMessage name={field.name} />
        </p>
      )} */}

      {/* Shadcn select - starts */}
      <div className="relative">
        <Select
          name={field.name}
          // onValueChange={field.onChange(() => handleChange)}
          onValueChange={handleChange}
          // value={field.value}
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
      {/* Radix select - starts */}
      {/* <Select.Root name={field.name} onValueChange={handleChange}>
        <Select.Trigger />
        <Select.Content position="popper">
          {data.map((country: { name: string; code: string }) => (
            <Select.Item key={country.name} value={country.name}>
              {country.name}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root> */}
      {/* Radix select - ends */}

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

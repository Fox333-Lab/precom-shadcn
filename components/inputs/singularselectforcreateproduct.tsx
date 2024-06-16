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
import { Label } from "../ui/label";

const SingularSelectForCreateProduct = ({
  data,
  handleChange,
  placeholder,
  label,
  ...props
}: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      {/* Shadcn select - starts */}
      <div className="relative">
        <Label htmlFor={field.name}>{label}</Label>
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
            {data.map((product: { name: string; _id: string }) => (
              <SelectItem
                key={product._id.toString()}
                value={product._id.toString()}
              >
                {product.name}
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

export default SingularSelectForCreateProduct;

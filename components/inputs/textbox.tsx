import { ErrorMessage, useField } from "formik";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { cn } from "@/lib/utils";

const TextBox = ({ iconName, label, ...props }: any) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <div className="relative">
        {/* <Text as="label">
          {label}
          <TextField.Root>
            <TextField.Slot>
              <FormIcon name={iconName} />
            </TextField.Slot> */}
        <Label htmlFor={field.name}>{label}</Label>
        <Input
          id={field.name}
          autoComplete="off"
          {...field}
          {...props}
          className={cn("", {
            "outline outline-1 outline-red-600": meta.error,
          })}
        />
        {/* </TextField.Root>
        </Text> */}
      </div>
      {meta.touched && meta.error && (
        <div className="text-red-600">
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg> */}
          <span className="text-sm ml-0.5">
            <ErrorMessage name={field.name} />
          </span>
        </div>
      )}
    </div>
  );
};

export default TextBox;

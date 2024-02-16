import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateEmail = async (email: string) => {
  const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (!emailRegEx.test(email)) {
    return { isEmailValid: false, message: "Invalid email" };
  }

  return { isEmailValid: true, message: "" };
  //return emailRegEx.test(email);
};

export const compareArrays = (array1: any, array2: any) => {
  if (array1.length !== array2.length) return false;
  const neww = (object: any) =>
    JSON.stringify(
      Object.keys(object)
        .sort()
        .map((key) => [key, object[key]])
    );
  array1 = new Set(array1.map(neww));
  return array2.every((object: any) => array1.has(neww(object)));
};

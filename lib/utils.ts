import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { customAlphabet } from "nanoid";

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

export const validateAlphabetsOnly = async (input: string, errMsg: string) => {
  console.log("input : ", input);
  const regex = /^[a-zA-Z\s]*$/;
  if (!regex.test(input)) {
    return { isInputValid: false, message: errMsg };
  }

  return { isInputValid: true, message: "" };
  //return regex.test(input);
};

export const validateAlphabetsAndNumbers = async (
  input: string,
  errMsg: string,
) => {
  console.log("input : ", input);
  const regex = /^[a-z0-9]+$/i;
  if (!regex.test(input)) {
    return { isInputValid: false, message: errMsg };
  }

  return { isInputValid: true, message: "" };
  //return regex.test(input);
};

// Array functions - starts here
export const compareArrays = (array1: any, array2: any) => {
  if (array1.length !== array2.length) return false;
  const neww = (object: any) =>
    JSON.stringify(
      Object.keys(object)
        .sort()
        .map((key) => [key, object[key]]),
    );
  array1 = new Set(array1.map(neww));
  return array2.every((object: any) => array1.has(neww(object)));
};

export const filterArray = (array: any, property: string) => {
  return array
    .filter((item: any) => item.name == property)
    .map((s: any) => s.value);
};

export const removeDuplicates = (array: any) => {
  return Array.from(new Set(array));
};

export const randomizeArray = (array: any) => {
  return [...array].sort(() => Math.random() - 0.5);
};
// Array functions - ends here

export const generateUniqueIdFor = (type: string) => {
  let alphabet: string = "";
  let length: number = 0;
  if (type === "order") {
    alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz-";
    length = 12;
  } else if (type === "user") {
    alphabet = "23456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz_";
    length = 14;
  } else if (type === "notification") {
    alphabet = "123456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz";
    length = 10;
  }
  const nanoid = customAlphabet(alphabet, length);
  const id = nanoid();
  return id;
};

export const delayExec = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// image/blob functions - starts here
export const dataURLtoBlob = (dataurl: string) => {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)?.[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};

export const blobToObjectURL = (blob: Blob) => {
  return URL.createObjectURL(blob);
};
// image/blob functions - ends here

export function formatPrice(
  price: number | string,
  options: {
    currency?: "INR" | "USD" | "EUR" | "GBP" | "BDT";
    notation?: Intl.NumberFormatOptions["notation"];
  } = {},
) {
  const { currency = "INR", notation = "compact" } = options;
  const numbericPrice = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency,
    notation,
    maximumFractionDigits: 2,
  }).format(Number(numbericPrice));
  // .format(numbericPrice);
}

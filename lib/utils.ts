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
  errMsg: string
) => {
  console.log("input : ", input);
  const regex = /^[a-z0-9]+$/i;
  if (!regex.test(input)) {
    return { isInputValid: false, message: errMsg };
  }

  return { isInputValid: true, message: "" };
  //return regex.test(input);
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

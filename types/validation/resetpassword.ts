import { type } from "os";

export type ResetPasswordInitialValueTypes = {
  new_password: string;
  conf_password: string;
  success: string;
  error: string;
};

export type ResetPasswordInputTypes = Omit<
  ResetPasswordInitialValueTypes,
  "success" | "error"
>;

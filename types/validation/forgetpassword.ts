import { LoginInputTypes } from "./login";

export type ForgetPasswordInputTypes = Omit<LoginInputTypes, "password">;

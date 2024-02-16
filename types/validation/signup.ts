import { LoginInitialValueTypes, LoginInputTypes } from "./login";

export type SignupInitialValueTypes = LoginInitialValueTypes & {
  name: string;
  conf_password: string;
};

export type SignupInputTypes = LoginInputTypes & {
  name: string;
  conf_password: string;
};

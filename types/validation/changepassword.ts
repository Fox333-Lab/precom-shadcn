export type ChangePasswordInitialValueTypes = {
  old_password: string;
  new_password: string;
  conf_password: string;
  success: string;
  error: string;
};

export type ChangePasswordInputTypes = Omit<
  ChangePasswordInitialValueTypes,
  "success" | "error"
>;

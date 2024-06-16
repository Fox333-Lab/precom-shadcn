"use client";
import { Formik, Form, FormikProps } from "formik";
import axios from "axios";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import {
  ResetPasswordInitialValueTypes,
  ResetPasswordInputTypes,
} from "@/types/validation/resetpassword";
import { TextBox } from "../inputs";
import { H3 } from "../ui/textui";
import { Button } from "../ui/button";
import {
  ChangePasswordInitialValueTypes,
  ChangePasswordInputTypes,
} from "@/types/validation/changepassword";

const initialValues: ChangePasswordInitialValueTypes = {
  old_password: "",
  new_password: "",
  conf_password: "",
  success: "",
  error: "",
};

const ChangePasswordForm = ({ session }: any) => {
  const [changeStatus, setChangeStatus] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const { old_password, new_password, conf_password, success, error } =
    changeStatus;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangeStatus({ ...changeStatus, [name]: value });
  };
  console.log("change page : user : ", changeStatus);
  const changePasswordValidation = Yup.object({
    old_password: Yup.string()
      .required()
      .min(6, "min 6 characters required")
      .max(10, "entry exceeds character limit of 10"),
    new_password: Yup.string()
      .required()
      .min(6, "min 6 characters required")
      .max(10, "entry exceeds character limit of 10"),
    conf_password: Yup.string()
      .required()
      .oneOf(
        [Yup.ref("new_password")],
        "Entry should match with password field"
      ),
  });

  const ChangePasswordHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/changepassword", {
        old_password,
        new_password,
      });

      //   let options = {
      //     redirect: false,
      //     email: data.email,
      //     password: new_password,
      //   };
      //   const res = await signIn("credentials", options);
      if (data?.message && data?.success === false) {
        setChangeStatus({ ...changeStatus, error: data?.message, success: "" });
        return;
      }
      setChangeStatus({ ...changeStatus, error: "", success: data.message });
      setLoading(false);
      //   window.location.reload();
    } catch (error: any) {
      console.log("errrrror message : ", error.message);
      setLoading(false);
      setChangeStatus({
        ...changeStatus,
        error: error.response.data.message,
        success: "",
      });
    }
  };

  return (
    <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <H3 className="text-center">Change Password</H3>
      <Formik
        enableReinitialize
        initialValues={{ old_password, new_password, conf_password }}
        validationSchema={changePasswordValidation}
        onSubmit={ChangePasswordHandler}
      >
        {(props: FormikProps<ChangePasswordInputTypes>) => (
          <Form>
            <div className="flex flex-col gap-5">
              <TextBox
                type="password"
                // label="New Password"
                placeholder="enter old password"
                iconName="Lock"
                name="old_password"
                onChange={handleChange}
              />
              <TextBox
                type="password"
                // label="New Password"
                placeholder="enter new password"
                iconName="Lock"
                name="new_password"
                onChange={handleChange}
              />
              <TextBox
                type="password"
                // label="Confirm Password"
                placeholder="confirm new password"
                iconName="Lock"
                name="conf_password"
                onChange={handleChange}
              />
              <Button type="submit" className="w-full cursor-pointer">
                Update Password
              </Button>
              <div>
                {error && <span className="text-red-600">{error}</span>}
                {success && <span className="text-green-600">{success}</span>}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePasswordForm;

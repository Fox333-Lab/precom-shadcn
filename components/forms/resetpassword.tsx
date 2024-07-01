"use client";
import { Formik, Form, FormikProps } from "formik";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
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
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Gitlab } from "lucide-react";

const initialValues: ResetPasswordInitialValueTypes = {
  new_password: "",
  conf_password: "",
  success: "",
  error: "",
};

const ResetPasswordForm = ({ resetid }: { resetid: string }) => {
  const [resetStatus, setResetStatus] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const { new_password, conf_password, success, error } = resetStatus;
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResetStatus({ ...resetStatus, [name]: value });
  };
  console.log("reset page : user : ", resetStatus);
  const passwordValidation = Yup.object({
    new_password: Yup.string()
      .required()
      .min(6, "min 6 characters required")
      .max(10, "entry exceeds character limit of 10"),
    conf_password: Yup.string()
      .required()
      .oneOf(
        [Yup.ref("new_password")],
        "Entry should match with password field",
      ),
  });

  const ResetPasswordHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/resetpassword", {
        resetid,
        new_password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: new_password,
      };
      const res = await signIn("credentials", options);
      if (res?.error) {
        setResetStatus({ ...resetStatus, error: res?.error, success: "" });
      }
      //setSuccess(data.message);
      setLoading(false);
      window.location.reload();
    } catch (error: any) {
      console.log("errrrror message : ", error.message);
      setLoading(false);
      setResetStatus({
        ...resetStatus,
        error: error.response.data.message,
        success: "",
      });
    }
  };

  return (
    <div className="sm:20 flex w-full flex-col gap-8 p-8 md:p-52 lg:w-1/2 lg:p-36">
      {/* <H3 className="text-center">Reset Password</H3> */}
      <div className="flex items-center justify-center">
        <Gitlab size={60} strokeWidth={0.8} />
      </div>
      <Card className="px-2">
        <CardHeader>
          <CardTitle className="text-center">Reset Password</CardTitle>
        </CardHeader>
        <CardContent>
          <Formik
            enableReinitialize
            initialValues={{ new_password, conf_password }}
            validationSchema={passwordValidation}
            onSubmit={ResetPasswordHandler}
          >
            {(props: FormikProps<ResetPasswordInputTypes>) => (
              <Form>
                <div className="flex flex-col gap-5">
                  <TextBox
                    type="password"
                    label="New Password"
                    placeholder="enter new password"
                    iconName="Lock"
                    name="new_password"
                    onChange={handleChange}
                  />
                  <TextBox
                    type="password"
                    label="Confirm Password"
                    placeholder="confirm new password"
                    iconName="Lock"
                    name="conf_password"
                    onChange={handleChange}
                  />
                  <Button type="submit" className="mt-3 w-full cursor-pointer">
                    Reset
                  </Button>
                  <div>
                    {error && <span className="text-red-600">{error}</span>}
                    {success && (
                      <span className="text-green-600">{success}</span>
                    )}
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;

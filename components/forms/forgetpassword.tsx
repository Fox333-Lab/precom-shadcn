"use client";
import axios from "axios";
import { Formik, Form, FormikProps } from "formik";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
import { ForgetPasswordInputTypes } from "@/types/validation/forgetpassword";
import { TextBox } from "../inputs";
import { H3 } from "../ui/textui";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const emailValidation = Yup.object({
  email: Yup.string().required().email(),
});

const ForgotPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, seterror] = useState("");
  const [email, setEmail] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  const ForgotPasswordHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/forgetpassword", {
        email,
      });
      setSuccess(data.message);
      seterror("");
      setLoading(false);
      setEmail("");
    } catch (error: any) {
      setLoading(false);
      seterror(error.response.data.message);
      setSuccess("");
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <H3 className="text-center">Forgot Password?</H3>
      <Formik
        enableReinitialize
        initialValues={{
          email,
        }}
        validationSchema={emailValidation}
        onSubmit={ForgotPasswordHandler}
      >
        {(props: FormikProps<ForgetPasswordInputTypes>) => (
          <Form>
            <div className="flex flex-col gap-5">
              <TextBox
                type="email"
                label="Email"
                placeholder="enter email"
                iconName="AtSign"
                name="email"
                onChange={handleChange}
              />
              <Button type="submit" className="w-full cursor-pointer">
                Submit
              </Button>
              <div>
                {error && <span className="text-red-600">{error}</span>}
                {success && <span className="text-green-600">{success}</span>}
              </div>
              <div className="flex justify-center items-center gap-4">
                <Separator orientation="horizontal" />
                <span>OR</span>
                <Separator orientation="horizontal" />
              </div>
              <Link href="/auth/signin" className="mx-auto">
                Sign In
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotPasswordForm;

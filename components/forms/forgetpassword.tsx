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
import { Gitlab } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
    <div className="sm:20 flex w-full flex-col gap-8 p-8 md:p-52 lg:w-1/2 lg:p-36">
      {/* <H3 className="text-center">Forgot Password?</H3> */}
      <div className="flex items-center justify-center">
        <Gitlab size={60} strokeWidth={0.8} />
      </div>
      <Card className="px-2">
        <CardHeader>
          <CardTitle className="text-center">Forgot Password?</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <Button type="submit" className="mt-3 w-full cursor-pointer">
                    Submit
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
        {/* <CardFooter>
          {/ * <div className="flex w-full flex-col">
            <div className="flex w-full items-center justify-center gap-4">
              <Separator orientation="horizontal" />
              <span>OR</span>
              <Separator orientation="horizontal" />
            </div>
            <Link href="/auth/signin" className="mx-auto">
              Sign In
            </Link>
          </div> * /}

          {/ * <div>{success && <span>{success}</span>}</div>
      <div>{error && <span className="text-red-600">{error}</span>}</div> * /}
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;

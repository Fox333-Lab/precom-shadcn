"use client";
import axios from "axios";
import { Formik, Form, FormikProps } from "formik";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import {
  SignupInitialValueTypes,
  SignupInputTypes,
} from "@/types/validation/signup";
import { TextBox } from "../inputs";
import { H3 } from "../ui/textui";
import { Button } from "../ui/button";

const initialValues: SignupInitialValueTypes = {
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
};

const SignUpForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  console.log("path name : ", pathName);
  console.log("search params : ", searchParams);
  const { name, email, password, conf_password, success, error } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log("user : ", user);

  const signUpValidation = Yup.object({
    name: Yup.string()
      .required()
      .min(3, "")
      .max(16, "")
      .matches(/^[aA-zZ]/, ""),
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .min(6, "min 6 characters required")
      .max(10, "entry exceeds character limit of 10"),
    conf_password: Yup.string()
      .required()
      .oneOf([Yup.ref("password")], "Entry should match with password field"),
  });
  const signUpHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      console.log("signup handler : ", user);
      setLoading(false);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err: any) {
      setLoading(false);
      setUser({ ...user, success: "", error: err.response.data.message });
      console.log("signup handler error : ", err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <H3 className="text-center">Sign Up</H3>
      <Formik
        enableReinitialize
        initialValues={{ name, email, password, conf_password }}
        validationSchema={signUpValidation}
        onSubmit={signUpHandler}
      >
        {(props: FormikProps<SignupInputTypes>) => (
          <Form>
            {/* <!-- Username Input --> */}
            <div className="flex flex-col gap-5">
              <TextBox
                type="text"
                label="Name"
                placeholder="enter name"
                iconName="AtSign"
                name="name"
                onChange={handleChange}
              />
              {/* <!-- Email Input --> */}
              <TextBox
                type="email"
                label="Email"
                placeholder="enter email"
                iconName="AtSign"
                name="email"
                onChange={handleChange}
              />

              {/* <!-- Password Input --> */}
              <TextBox
                type="password"
                label="Password"
                placeholder="enter password"
                iconName="Lock"
                name="password"
                onChange={handleChange}
              />
              {/* <!-- Confirm Password Input --> */}
              <TextBox
                type="password"
                label="Confirm Password"
                placeholder="re-enter password"
                iconName="Lock"
                name="conf_password"
                onChange={handleChange}
              />

              {/* <!-- Signup Button --> */}
              <Button type="submit" className="w-full cursor-pointer mt-3">
                Sign Up
              </Button>
              {error && (
                <span className="text-red-600 text-center text-sm">
                  *{error}
                </span>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;

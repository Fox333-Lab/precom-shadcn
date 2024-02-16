"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import {
  LoginInputTypes,
  LoginInitialValueTypes,
} from "@/types/validation/login";
import { TextBox } from "../inputs";
import { H3 } from "../ui/textui";
import { Button } from "../ui/button";

const initialValues: LoginInitialValueTypes = {
  email: "",
  password: "",
  success: "",
  error: "",
};

const LoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  console.log("path name : ", pathName);
  console.log("search params : ", searchParams);
  const { email, password, success, error } = user;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  console.log("user : ", user);

  const loginValidation = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });

  const SignInHandler = async () => {
    console.log("In app/signin/page.js - SignInHandler");
    console.log("user : ", user);
    setLoading(true);
    let options = {
      redirect: false,
      email: email,
      password: password,
    };
    console.log("In app/signin/page.js - awaiting credentials");
    const res = await signIn("credentials", options);
    console.log("In app/signin/page.js - after awaiting credentials");
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      console.log("In app/signin/page.js - has error : ", res?.error);
      setLoading(false);
      setUser({ ...user, error: res?.error });
    } else {
      console.log("In app/signin/page.js - pushing to home");
      console.log(
        "In app/signin/page.js - callbackUrl : ",
        searchParams.get("callbackUrl")
      );
      //router.push(searchParams.get("callbackUrl") || "/cart");
      router.push("/checkout");
    }
  };

  return (
    <div className="flex flex-col gap-6 lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
      <H3 className="text-center">Login</H3>
      <Formik
        enableReinitialize
        initialValues={{
          email,
          password,
        }}
        validationSchema={loginValidation}
        onSubmit={SignInHandler}
      >
        {(props: FormikProps<LoginInputTypes>) => (
          <Form>
            {/* <!-- Username Input --> */}
            <div className="flex flex-col gap-5">
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
              {/* <!-- Forgot Password Link --> */}
              <div className=" text-blue-500">
                <Link href="/">Forgot Password</Link>
              </div>
              {/* <!-- Login Button --> */}
              <Button type="submit" className="w-full cursor-pointer">
                Login
              </Button>
              {error && (
                <span className="text-red-600 text-center">*{error}</span>
              )}
            </div>
          </Form>
        )}
      </Formik>
      {/* <!-- Sign up  Link --> */}
      <div className="md:gap-2 flex gap-1 justify-center flex-wrap">
        <span className="text-muted-foreground">Don't Have an account?</span>
        <Link href="/signup">Sign up Here</Link>
      </div>
      {/* <div>{success && <span>{success}</span>}</div>
      <div>{error && <span className="text-red-600">{error}</span>}</div> */}
    </div>
  );
};

export default LoginForm;

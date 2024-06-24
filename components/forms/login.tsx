"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  usePathname,
  useRouter,
  useSearchParams,
  redirect,
} from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { Formik, Form, FormikProps } from "formik";
import * as Yup from "yup";
import {
  LoginInputTypes,
  LoginInitialValueTypes,
} from "@/types/validation/login";
import { TextBox } from "../inputs";
import { H3 } from "../ui/textui";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Gitlab } from "lucide-react";

const initialValues: LoginInitialValueTypes = {
  email: "",
  password: "",
  success: "",
  error: "",
};

const LoginForm = () => {
  const { data: session, status } = useSession();
  // const [loggedIn, setLoggedIn] = useState(session ? true : false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialValues);
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { email, password, success, error } = user;

  // useEffect(() => {
  //   console.log("session siggn in : ", session);
  //   console.log("session siggn in : ", loggedIn);
  //   if (loggedIn) {
  //     router.push(searchParams.get("callbackUrl") || "/cart");
  //   }
  // }, [loggedIn]);
  //console.log("logged in : ", loggedIn);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  // console.log("user : ", user);

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
      // setLoggedIn(false);
    } else {
      // setLoggedIn(true);
      console.log("In app/signin/page.js - pushing to home");
      console.log(
        "In app/signin/page.js - callbackUrl : ",
        searchParams.get("callbackUrl"),
      );
      //redirect(searchParams.get("callbackUrl") || "/cart");
      //router.push(searchParams.get("callbackUrl") || "/cart");
      //router.push("/checkout");
    }
  };

  console.log("path name : ", pathName);
  console.log("search params : ", searchParams);
  console.log("session  : ", session);
  console.log("session status : ", status);
  if (status === "loading") return null;
  if (session && status === "authenticated") {
    redirect(searchParams.get("callbackUrl") || "/cart");
  }
  return (
    <div className="sm:20 flex w-full flex-col gap-8 p-8 md:p-52 lg:w-1/2 lg:p-36">
      {/* <H3 className="text-center">Login to your account</H3> */}
      <div className="flex items-center justify-center">
        <Gitlab size={60} strokeWidth={0.8} />
      </div>
      <Card className="px-2">
        <CardHeader>
          <CardTitle className="text-center">Login to your account</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <div className="text-right font-medium text-primary">
                    <Link href="/forgetpassword">Forgot Password?</Link>
                  </div>
                  {/* <!-- Login Button --> */}
                  <Button type="submit" className="w-full cursor-pointer">
                    Login
                  </Button>
                  {error && (
                    <span className="text-center text-red-600">*{error}</span>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter>
          {/* <!-- Sign up  Link --> */}
          <div className="flex w-full flex-wrap items-center justify-center gap-1 md:gap-2">
            <span className="text-muted-foreground">
              Don't Have an account?
            </span>
            <Link href="/signup" className="font-medium text-primary">
              Sign up Here
            </Link>
          </div>
          {/* <div>{success && <span>{success}</span>}</div>
      <div>{error && <span className="text-red-600">{error}</span>}</div> */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginForm;

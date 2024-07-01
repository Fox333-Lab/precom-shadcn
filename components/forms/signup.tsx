"use client";
import axios from "axios";
import { Formik, Form, FormikProps } from "formik";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useState } from "react";
import * as Yup from "yup";
import {
  SignupInitialValueTypes,
  SignupInputTypes,
} from "@/types/validation/signup";
import { TextBox } from "../inputs";
import { H3 } from "../ui/textui";
import { Button } from "../ui/button";
import { Gitlab } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { useSession } from "next-auth/react";

const initialValues: SignupInitialValueTypes = {
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
};

const SignUpForm = () => {
  const { data: session, status } = useSession();
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
  if (status === "loading") return null;
  if (session && status === "authenticated") {
    redirect(searchParams.get("callbackUrl") || "/cart");
  }
  return (
    <div className="sm:20 flex w-full flex-col gap-8 p-8 md:p-52 lg:w-1/2 lg:p-36">
      {/* <H3 className="text-center">Sign Up</H3> */}
      <div className="flex items-center justify-center">
        <Gitlab size={60} strokeWidth={0.8} />
      </div>
      <Card className="px-2">
        <CardHeader>
          <CardTitle className="text-center">Create Account</CardTitle>
        </CardHeader>
        <CardContent>
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
                  <Button type="submit" className="mt-3 w-full cursor-pointer">
                    Sign Up
                  </Button>
                  {error && (
                    <span className="text-center text-sm text-red-600">
                      *{error}
                    </span>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter>
          <div className="flex w-full flex-wrap items-center justify-center gap-1 md:gap-2">
            <span className="text-muted-foreground">
              Already have an account?
            </span>
            <Link href="/signin" className="font-medium text-primary">
              Sign in Here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUpForm;

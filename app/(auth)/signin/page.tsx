// "use client";
import LoginForm from "@/components/forms/login";
// import { useSession } from "next-auth/react";
// import { redirect, useRouter, useSearchParams } from "next/navigation";

const SignIn = () => {
  // const { data: session, status } = useSession();
  // const searchParams = useSearchParams();
  // const router = useRouter();
  // console.log("sign in page session : ", session);
  // console.log("sign in page status : ", status);

  // if (status === "loading") return null;
  // if (status === "authenticated") {
  //   redirect(searchParams.get("callbackUrl") || "/cart");
  // }
  // console.log("status: ", status);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <LoginForm />
    </div>
  );
};

export default SignIn;

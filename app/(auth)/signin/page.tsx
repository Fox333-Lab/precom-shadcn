import winter2 from "@/public/images/winter2.jpg";
import Image from "next/image";
import LoginForm from "@/components/forms/login";

const SignIn = () => {
  // const SignInHandler = async () => {
  //   let options = {
  //     redirect: false,
  //     email: "sajj.dev4@gmail.com",
  //     password: "sajin@1231",
  //   };
  //   console.log("In app/signin/page.js - awaiting credentials");
  //   const res = await signIn("credentials", options);
  //   if (res?.error) {
  //     console.log("res?.error : ", res?.error);
  //   } else {
  //     console.log("res : ", res);
  //   }
  // };
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      {/* <!-- Left: Image --> */}
      {/* <div className="md:w-1/2 h-screen hidden md:block overflow-hidden">
        <Image
          src={winter2}
          alt="Placeholder Image"
          className="object-cover h-full"
        />
      </div> */}
      {/* <!-- Right: Login Form --> */}
      <LoginForm />
    </div>
  );
};

export default SignIn;

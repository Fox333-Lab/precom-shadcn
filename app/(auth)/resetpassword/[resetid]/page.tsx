import ResetPasswordForm from "@/components/forms/resetpassword";

const SignupPage = ({ params }: { params: { resetid: string } }) => {
  return (
    <div className="bg-gray-100 flex justify-center items-center h-screen">
      <ResetPasswordForm resetid={params.resetid} />
    </div>
  );
};

export default SignupPage;

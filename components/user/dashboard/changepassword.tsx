"use client";
import ChangePasswordForm from "@/components/forms/changepassword";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React from "react";

const ChangePassword = () => {
  const { data: session, status } = useSession();
  if (!session) {
    redirect("/signin");
  }
  return <ChangePasswordForm session={session} />;
};

export default ChangePassword;

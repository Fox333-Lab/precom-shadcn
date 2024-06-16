"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect } from "react";

const SendMailPage = () => {
  const sendm = async () => {
    console.log("sendm");
    const { data } = await axios.post("/api/testapis/sendmail", {});
    console.log("send mail page : ", data);
  };

  return (
    <div className="mt-10 ml-10">
      <Button onClick={() => sendm()}>Sen mail</Button>
    </div>
  );
};

export default SendMailPage;

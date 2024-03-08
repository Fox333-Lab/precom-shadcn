"use client";
import { getSidebarState } from "@/store/features/admin/dashboard/sidebarslice";
import React from "react";
import { useSelector } from "react-redux";

const Sidebar1 = () => {
  const sideBarState: boolean = useSelector(getSidebarState);
  const showSideBar = sideBarState;
  console.log("sideState : ", sideBarState);
  return <div>Sidebar</div>;
};

export default Sidebar1;

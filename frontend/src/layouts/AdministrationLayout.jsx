import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/slices/administration/Header";

export default function AdministrationLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

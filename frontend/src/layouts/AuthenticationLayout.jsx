import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/slices/authentication/Header";

export default function AuthenticationLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

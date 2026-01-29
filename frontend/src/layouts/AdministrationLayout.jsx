import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "@/slices/administration/Header";
import { useSelector } from "react-redux";

export default function AdministrationLayout() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) return <Navigate to={"/authentication"} />;
  if (isAuthenticated && !user.admin) return <Navigate to={"/"} />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

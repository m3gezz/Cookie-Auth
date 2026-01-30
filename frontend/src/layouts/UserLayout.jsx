import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Header from "@/slices/user/Header";
import { useSelector } from "react-redux";

export default function UserLayout() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (!isAuthenticated) return <Navigate to={"/authentication"} />;
  if (isAuthenticated && !user.email_verified_at)
    return <Navigate to={"/verify-email"} />;
  if (isAuthenticated && user.admin) return <Navigate to={"/administration"} />;

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

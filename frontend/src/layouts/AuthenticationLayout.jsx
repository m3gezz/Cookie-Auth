import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthenticationLayout() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  if (isAuthenticated && user.admin) return <Navigate to={"/administration"} />;
  if (isAuthenticated) return <Navigate to={"/"} />;

  return (
    <main className="h-screen flex items-center justify-center my-10">
      <Outlet />
    </main>
  );
}

import { createBrowserRouter } from "react-router-dom";
import UserLayout from "@/layouts/UserLayout";
import Home from "@/pages/user/Home";
import AuthenticationLayout from "@/layouts/AuthenticationLayout";
import SignIn from "@/pages/authentication/SignIn";
import SignUp from "@/pages/authentication/SignUp";
import AdministrationLayout from "@/layouts/AdministrationLayout";
import Dashboard from "@/pages/administration/Dashboard";
import NotFound from "@/pages/other/NotFound";

const routes = [
  {
    path: "/",
    element: <UserLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/authentication",
    element: <AuthenticationLayout />,
    children: [
      {
        index: true,
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/administration",
    element: <AdministrationLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export const router = createBrowserRouter(routes);

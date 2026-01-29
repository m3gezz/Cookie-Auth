import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Auth from "./layouts/Auth";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Auth>
        <Toaster position="top-center" />
        <RouterProvider router={router} />
      </Auth>
    </Provider>
  </StrictMode>,
);

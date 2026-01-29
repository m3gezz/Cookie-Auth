import React, { useEffect } from "react";
import api from "@/api/axios";
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "@/redux/userSlice";
import { Spinner } from "@/components/ui/spinner";

export default function Auth({ children }) {
  const { isLoading } = useSelector((state) => state.user);
  const disp = useDispatch();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await api.get("api/user");
        res && disp(setAuth(res?.data?.user));
      } catch (err) {
        console.error(err);
      }
    };
    fetchMe();
  }, []);

  return <>{isLoading ? <Spinner /> : children}</>;
}

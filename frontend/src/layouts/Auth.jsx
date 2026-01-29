import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/userSlice";
import { Spinner } from "@/components/ui/spinner";

export default function Auth({ children }) {
  const [loading, setLoading] = useState(false);
  const disp = useDispatch();

  useEffect(() => {
    setLoading(true);
    const fetchMe = async () => {
      try {
        const res = await api.get("api/user");
        res?.data?.user && disp(setAuth(res?.data?.user));
      } catch (err) {
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, []);

  return <>{loading ? <Spinner /> : children}</>;
}

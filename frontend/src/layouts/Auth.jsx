import React, { useEffect, useState } from "react";
import api from "@/api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/userSlice";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";

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

  return (
    <>
      {loading ? (
        <Button
          disabled
          size="sm"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Spinner data-icon="inline-start" />
          Looking for accounts
        </Button>
      ) : (
        children
      )}
    </>
  );
}

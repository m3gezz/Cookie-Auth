import React from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "@/api/axios";
import { removeAuth } from "@/redux/userSlice";
import { toast } from "sonner";

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const disp = useDispatch();

  const logOut = async () => {
    try {
      const res = await api.post("api/sign-out");
      res && disp(removeAuth());
      toast.success("Signed Out successfully");
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      {user.username} <button onClick={logOut}>log out</button>
    </div>
  );
}

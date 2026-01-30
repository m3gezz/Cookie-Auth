import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import api from "@/api/axios";
import { removeAuth } from "@/redux/userSlice";
import { toast } from "sonner";

export default function VerifyEmail() {
  const [loading, setLoading] = useState({ logout: false, link: false });
  const [coolDown, setCoolDown] = useState(0);

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const disp = useDispatch();

  useEffect(() => {
    const savedCoolDown = localStorage.getItem("emailCoolDown");
    if (savedCoolDown) setCoolDown(Number(savedCoolDown));
  }, []);

  useEffect(() => {
    if (coolDown <= 0) return;

    const timer = setTimeout(() => setCoolDown(coolDown - 1), 1000);

    localStorage.setItem("emailCoolDown", coolDown);

    return () => clearTimeout(timer);
  }, [coolDown]);

  const resendVerificationLink = async () => {
    setLoading((prev) => ({ ...loading, link: true }));

    try {
      await api.post("api/email/verification-notification");

      toast.success("Email verification link was sent successfully");
      setCoolDown(30);
    } catch (err) {
      if (err.response?.status === 409) {
        toast.success("Email is already verified");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        return;
      }

      toast.error("Something went wrong");
    } finally {
      setLoading((prev) => ({ ...loading, link: false }));
    }
  };

  const signOut = async () => {
    setLoading((prev) => ({ ...loading, logout: true }));

    try {
      const res = await api.post("api/sign-out");
      res && disp(removeAuth());
      toast.success("Signed Out successfully");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading((prev) => ({ ...loading, logout: false }));
    }
  };

  if (!isAuthenticated) return <Navigate to="/authentication" />;
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <Card className="md:w-xl">
        <CardHeader>
          <CardTitle>Email verification</CardTitle>
          <CardDescription>
            We sent a verification link to your email, ***{user?.email.slice(5)}
            , Check your emails please.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            It is mandatory to verify your email before accessing our website,
            You can always get another verification link, Thanks for your
            patient.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col items-stretch gap-2.5">
          <Button
            onClick={resendVerificationLink}
            disabled={loading?.link || loading.logout || coolDown > 0}
          >
            {loading?.link ? (
              <Spinner />
            ) : coolDown > 0 ? (
              `Resend in ${coolDown}s`
            ) : (
              "Resend Verification Email"
            )}
          </Button>
          <Button
            variant="secondary"
            onClick={signOut}
            disabled={loading?.link || loading.logout}
          >
            {loading?.logout ? <Spinner /> : "Sign Out"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

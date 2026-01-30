import React from "react";
import { Link } from "react-router-dom";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signIn } from "@/zodSchemas/authentication";
import api from "@/api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/userSlice";

export default function SignIn() {
  const disp = useDispatch();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(signIn),
  });

  const onSubmit = async (data) => {
    try {
      await api.get("sanctum/csrf-cookie");
      const res = await api.post("api/sign-in", data);
      res && disp(setAuth(res?.data?.user));

      toast.success("Signed In successfully");
    } catch (err) {
      toast.error("Something went wrong");

      const errors = err.response.data.errors;
      for (const field in errors) {
        setError(field, {
          type: "server",
          message: errors[field][0],
        });
      }
    }
  };

  return (
    <>
      <Card className="w-full md:w-xl">
        <CardHeader>
          <CardTitle>Sign in to your account</CardTitle>
          <CardDescription>
            Enter your information below to sign in to your account
          </CardDescription>
          <CardAction>
            <Link to="sign-up">
              <Button variant="link">Sign Up</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                type="email"
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Email"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex justify-between">
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <FieldDescription>
                        <Link>Forgot your password ?</Link>
                      </FieldDescription>
                    </div>
                    <Input
                      type="password"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Sign In"}
              </Button>

              <div className="flex items-center -my-4">
                <div className="grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Or</span>
                <div className="grow border-t border-gray-300"></div>
              </div>

              <Button variant="secondary" type="button" disabled={isSubmitting}>
                Continue With Google
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

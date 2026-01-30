import React from "react";
import { Link } from "react-router-dom";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { signUp } from "@/zodSchemas/authentication";
import api from "@/api/axios";
import { useDispatch } from "react-redux";
import { setAuth } from "@/redux/userSlice";
import { Chrome } from "lucide-react";

export default function SignUp() {
  const disp = useDispatch();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    resolver: zodResolver(signUp),
  });

  const onSubmit = async (data) => {
    try {
      await api.get("sanctum/csrf-cookie");
      const res = await api.post("api/sign-up", data);
      res && disp(setAuth(res?.data?.user));

      toast.success("Signed Up successfully");
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
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your information below to create your account
          </CardDescription>
          <CardAction>
            <Link to="/authentication">
              <Button variant="link">Sign In</Button>
            </Link>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FieldGroup>
              <Controller
                name="username"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Enter Your Username"
                      autoComplete="on"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
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
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
              <Controller
                name="password_confirmation"
                control={control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Confirm Your Password
                    </FieldLabel>
                    <Input
                      type="password"
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder="Renter Your Password"
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : "Sign Up"}
              </Button>

              <div className="flex items-center -my-4">
                <div className="grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500">Or</span>
                <div className="grow border-t border-gray-300"></div>
              </div>

              <Button variant="secondary" type="button" disabled={isSubmitting}>
                Continue With Google <Chrome />
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="md:text-sm text-xs mx-auto text-center px-20">
          <p>
            By clicking Sign Up, you automatically agree to our
            <Button variant="link" className="underline px-1">
              Terms of Service
            </Button>
            and
            <Button variant="link" className="underline px-1">
              Privacy Policy
            </Button>
            .
          </p>
        </CardFooter>
      </Card>
    </>
  );
}

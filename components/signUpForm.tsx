"use client";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { TSignUpSchema, signUpSchema } from "@/lib/types";
import { useToast } from "./ui/use-toast";

import { useRouter } from "next/navigation";
import { Toaster } from "./ui/toaster";

function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const { toast } = useToast();

  const router = useRouter();

  const isBrowser = typeof window !== "undefined";

  let multiStepFormData: { [key: string]: string | boolean };
  // this condition is necessary because this component gets server side rendered
  if (isBrowser) {
    multiStepFormData = {
      cameFrom: sessionStorage.getItem("selectedSource")
        ? JSON.parse(sessionStorage.getItem("selectedSource") as string)
        : "Other",
      linkedGithub: sessionStorage.getItem("LinkGithub")
        ? JSON.parse(sessionStorage.getItem("LinkGithub") as string)
        : false,
      enabled_notifications: sessionStorage.getItem("activatedNotifications")
        ? JSON.parse(sessionStorage.getItem("activatedNotifications") as string)
        : false,
      goal: sessionStorage.getItem("dailyGoal")
        ? String(
            Number(
              JSON.parse(
                sessionStorage.getItem("dailyGoal") as string
              ).substring(0, 2)
            )
          )
        : "10",
    };
  }
  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("/api/signUp", {
      method: "POST",
      body: JSON.stringify({
        signUpFormData: data,
        multiStepFormData,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response);
    const responseData = await response.json();
    console.log(responseData);

    if (response.status === 500) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again",
      });
      return;
    }

    if (responseData.errors) {
      const errors = responseData.errors;

      if (errors.email) {
        setError("email", {
          type: "server",
          message: errors.email,
        });
      }
      if (errors.password) {
        setError("password", {
          type: "server",
          message: errors.password,
        });
      }
      return;
    }

    if (response.ok) {
      toast({
        title: "Account has been successfully created ",
        description: "Welcome to TypeLingo",
      });
      if (isBrowser) {
        sessionStorage.clear();
      }
      router.push("/dashboard");
    }

    reset();
  };

  return (
    <>
      <form
        className="flex flex-col gap-2 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          {...register("name")}
          aria-label="Name (optional)"
          placeholder="Name (optional)"
          type="text"
        />
        <Input
          {...register("email")}
          aria-label="Email"
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <Input
          {...register("password")}
          aria-label="Password"
          placeholder="Password"
          type="password"
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <Button
          disabled={isSubmitting}
          size={"full"}
          className="bg-blue-sky border-blue-sky border-b-dark-blue-sky mt-2"
        >
          {isSubmitting ? "SUBMITTING..." : "CREATE ACCOUNT"}
        </Button>
      </form>
      <Toaster />
    </>
  );
}

export default SignUpForm;

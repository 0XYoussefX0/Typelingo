"use client";

import Link from "next/link";

import { Button } from "./ui/button";
import { Input } from "./ui/input";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { TSignUpSchema, signUpSchema } from "@/lib/types";
import { useToast } from "./ui/use-toast";
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

  const onSubmit = async (data: TSignUpSchema) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();

    if (response.status === 500) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "Please try again",
      });
      return;
    }

    if (response.status === 400) {
      toast({
        variant: "destructive",
        title: "Invalid login credentials",
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
          {...register("email")}
          aria-label="Email"
          placeholder="Email"
          type="email"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
        <div className="w-full relative emailInput">
          <Input
            {...register("password")}
            aria-label="Password"
            placeholder="Password"
            type="password"
          />
          <Link
            href="/forgot-password"
            className="font-bold text-[13px] text-disabled-grey absolute right-4 top-1/2 -translate-y-1/2"
          >
            FORGOT?
          </Link>
        </div>
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
        <Button
          disabled={isSubmitting}
          size={"full"}
          className="bg-blue-sky border-blue-sky border-b-dark-blue-sky mt-2"
        >
          {isSubmitting ? "LOGGIN  IN..." : "LOG IN"}
        </Button>
      </form>
      <Toaster />
    </>
  );
}

export default SignUpForm;

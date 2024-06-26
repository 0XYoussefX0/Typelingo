import React from "react";
import { Button } from "@/components/ui/button";
import SignUp from "@/components/signUp";

import Image from "next/image";
import Link from "next/link";

import backIcon from "@/app/_assets/blBackIcon.svg";

async function Page() {
  return (
    <main className="relative flex justify-center items-center h-screen">
      <Button
        href="/"
        variant={"secondary"}
        size={"fit"}
        className="text-blue-sky py-[15px] px-[18px] text-sm absolute top-7 left-7  gap-2 "
      >
        <Image src={backIcon} alt="" className="w-3.5 fill-white" />
        <span className="pb-0.5">Go back Home</span>
      </Button>
      <Button
        href="/login"
        variant={"secondary"}
        size="fit"
        className="text-blue-sky w-fit py-[15px] px-[18px] text-sm absolute top-7 right-7 "
      >
        Login
      </Button>
      <div className="flex flex-col items-center gap-7 w-[90%] sm:w-[375px] mt-[250px] lg:mt-0">
        <h1 className="text-center font-bold text-2xl text-dark-grey">
          Create your profile
        </h1>
        <SignUp />
        <p className="text-center text-disabled-grey font-medium text-[15px]">
          By signing in to Duolingo, you agree to our{" "}
          <Link
            className="font-bold"
            href="https://store.duolingo.com/pages/terms-service"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            className="font-bold"
            href="https://store.duolingo.com/pages/privacy-policy"
          >
            Privacy Policy.
          </Link>
        </p>
        <p className="text-xs text-disabled-grey text-center w-3/4">
          This site is protected by reCAPTCHA Enterprise and the Google{" "}
          <Link
            className="font-bold"
            href="https://policies.google.com/privacy?hl=en-US"
          >
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link
            className="font-bold"
            href="https://policies.google.com/terms?hl=en-US"
          >
            Terms of Service
          </Link>{" "}
          apply.
        </p>
      </div>
    </main>
  );
}

export default Page;

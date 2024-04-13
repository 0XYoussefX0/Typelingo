import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import Link from "next/link";

import githubLogo from "@/app/_assets/githubLogo.svg";
import backIcon from "@/app/_assets/blBackIcon.svg";

function Page() {
  return (
    <main className="relative flex justify-center items-center h-screen">
      <Button
        href="/"
        variant={"secondary"}
        className="text-blue-sky w-fit py-[15px] px-[18px] text-sm absolute top-7 left-7  gap-2 "
      >
        <Image src={backIcon} alt="" className="w-3.5 fill-white" />
        <span className="pb-0.5">Go back Home</span>
      </Button>
      <Button
        href="/login"
        variant={"secondary"}
        className="text-blue-sky w-fit py-[15px] px-[18px] text-sm absolute top-7 right-7 "
      >
        Login
      </Button>
      <div className="flex flex-col items-center gap-7 w-[375px]">
        <h1 className="text-center font-bold text-2xl text-dark-grey">
          Create your profile
        </h1>
        <form className="flex flex-col gap-2 w-full">
          <Input
            aria-label="Name (optional)"
            placeholder="Name (optional)"
            type="text"
          />
          <Input aria-label="Email" placeholder="Email" type="email" />
          <Input aria-label="Password" placeholder="Password" type="password" />
          <Button className="bg-blue-sky border-blue-sky border-b-dark-blue-sky mt-2 w-full">
            CREATE ACCOUNT
          </Button>
        </form>
        <div className="flex gap-2 items-center w-full">
          <div className="h-0.5 bg-light-grey flex-1"></div>
          <div className="text-disabled-grey font-bold text-[13px]">OR</div>
          <div className="h-0.5 bg-light-grey flex-1"></div>
        </div>
        <Button variant={"secondary"} className=" gap-2.5">
          <Image src={githubLogo} alt="Github logo" width="20" height="19.59" />
          <span className="text-[#24292f] text-sm font-bold ">Github</span>
        </Button>
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

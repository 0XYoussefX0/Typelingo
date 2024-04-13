import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";

import logo from "@/app/_assets/logo.svg";

function Page() {
  return (
    <main className="flex flex-col  items-center h-screen">
      <nav className="bg-blue-sky justify-around w-full h-[70px] items-center flex">
        <Image src={logo} alt="typelingo's logo" />
        <div className="flex gap-2.5">
          <Button
            href="/Login"
            className="bg-white border-white border-b-[#ffffff5d] text-[#0B3E71] w-fit px-5"
          >
            LOGIN
          </Button>
          <Button href="/SignUp" className="w-fit px-5">
            SIGN UP
          </Button>
        </div>
      </nav>
      <div className="flex flex-col justify-center flex-1 items-center gap-6 w-[375px]">
        <div className="flex flex-col gap-2.5">
          <h1 className="text-center font-bold text-2xl text-dark-grey">
            Forgot password
          </h1>
          <p className="font-medium text-base text-[#3C3C3C] text-center">
            We will send you instructions on how to reset your password by
            email.
          </p>
        </div>
        <form className="flex flex-col gap-2 w-full">
          <Input aria-label="Email" placeholder="Email" type="email" />
          <Button className="bg-blue-sky border-blue-sky border-b-dark-blue-sky mt-2 w-full">
            SUBMIT
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Page;

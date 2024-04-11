"use client";

import { ReactNode } from "react";

import Image from "next/image";

import redditIcon from "@/app/_assets/redditIcon.svg";
import instagramIcon from "@/app/_assets/instagramIcon.png";
import facebookIcon from "@/app/_assets/facebookIcon.png";
import tiktokIcon from "@/app/_assets/tiktokIcon.svg";
import googleIcon from "@/app/_assets/googleIcon.svg";
import youtubeIcon from "@/app/_assets/youtubeIcon.svg";
import friendsAndFamilyIcon from "@/app/_assets/friendsAndFamily.svg";
import otherIcon from "@/app/_assets/otherIcon.svg";

import { Button } from "@/components/ui/button";

function Card({ children }: { children: ReactNode }) {
  return (
    <div className="pt-8 pb-6 lg:w-[213px] rounded-xl card cursor-pointer min-w-[140px] w-auto flex flex-col gap-6 items-center justify-end border-2 border-b-4 border-solid border-[#E5E5E5] ">
      {children}
    </div>
  );
}

function Step1() {
  return (
    <div className="px-6 flex justify-center items-center flex-col gap-6">
      <h1 className="text-center font-bold text-[28px] text-dark-grey">
        How did you hear about Duolingo?
      </h1>
      <div className="flex flex-col gap-7 w-full lg:w-fit">
        <div className="grid gap-2.5 md:grid-cols-4 w-full lg:w-fit grid-columns-auto">
          <Card>
            <Image src={redditIcon} alt="reddit icon" />
            <h2 className="font-bold text-dark-grey text-[15px]">Reddit</h2>
          </Card>
          <Card>
            <Image
              src={instagramIcon}
              alt="Instagram icon"
              width="69"
              height="69"
            />
            <h2 className="font-bold text-dark-grey text-[15px]">Instagram</h2>
          </Card>
          <Card>
            <Image
              src={facebookIcon}
              alt="facebook icon"
              width="69"
              height="69"
            />
            <h2 className="font-bold text-dark-grey text-[15px]">Facebook</h2>
          </Card>
          <Card>
            <Image src={tiktokIcon} alt="tiktok icon" />
            <h2 className="font-bold text-dark-grey text-[15px]">Tiktok</h2>
          </Card>
          <Card>
            <Image src={googleIcon} alt="google icon" />
            <h2 className="font-bold text-dark-grey text-[15px]">Google</h2>
          </Card>
          <Card>
            <Image src={youtubeIcon} alt="youtube icon" />
            <h2 className="font-bold text-dark-grey text-[15px]">Youtube</h2>
          </Card>
          <Card>
            <Image src={friendsAndFamilyIcon} alt="friends and family icon" />
            <h2 className="font-bold text-dark-grey text-[15px]">
              Friends/Family
            </h2>
          </Card>
          <Card>
            <Image src={otherIcon} alt="other icon" />
            <h2 className="font-bold text-dark-grey text-[15px]">Other</h2>
          </Card>
        </div>
        <Button className="mx-auto w-full">Continue</Button>
      </div>
    </div>
  );
}

export default Step1;

"use client";

import { ReactNode, useState } from "react";

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

import * as RadioGroup from "@radix-ui/react-radio-group";
import { useRouter } from "next/navigation";

function Card({
  children,
  radioInputValue,
}: {
  children: ReactNode;
  radioInputValue: string;
}) {
  return (
    <RadioGroup.Item
      value={radioInputValue}
      className="pt-8 pb-6 lg:w-[213px] rounded-xl card cursor-pointer min-w-[140px] w-auto flex flex-col gap-6 items-center justify-end border-2 border-b-4 border-solid border-[#E5E5E5] data-[state=checked]:border-light-blue active:border-2 active:mb-0.5 active:translate-y-1 data-[state=unchecked]:text-dark-grey data-[state=checked]:text-dark-blue"
    >
      {children}
    </RadioGroup.Item>
  );
}

function DiscoveryStep() {
  const [selectedSource, setSelectedSouce] = useState(
    JSON.parse(sessionStorage.getItem("selectedSource") ?? '""')
  );

  const router = useRouter();

  const nextStep = () => {
    sessionStorage.setItem("currentStepIndex", JSON.stringify(2 / 5));
    sessionStorage.setItem("selectedSource", JSON.stringify(selectedSource));
    sessionStorage.setItem("previousStep", JSON.stringify("DiscoveryStep"));
    router.push("/getting-started?Step=DailyGoalStep");
  };

  return (
    <div className="px-6 flex justify-center items-center flex-col gap-6">
      <h1 className="text-center font-bold text-[28px] text-dark-grey">
        How did you hear about Duolingo?
      </h1>
      <div className="flex flex-col gap-7 w-full lg:w-fit">
        <RadioGroup.Root
          onValueChange={setSelectedSouce}
          value={selectedSource}
        >
          <div className="grid gap-2.5 md:grid-cols-4 w-full lg:w-fit grid-columns-auto">
            <Card radioInputValue={"Reddit"}>
              <Image src={redditIcon} alt="reddit icon" />
              <h2 className="font-bold text-inherit text-[15px]">Reddit</h2>
            </Card>
            <Card radioInputValue={"Instagram"}>
              <Image
                src={instagramIcon}
                alt="Instagram icon"
                width="69"
                height="69"
              />
              <h2 className="font-bold text-inherit text-[15px]">Instagram</h2>
            </Card>
            <Card radioInputValue={"Facebook"}>
              <Image
                src={facebookIcon}
                alt="facebook icon"
                width="69"
                height="69"
              />
              <h2 className="font-bold text-inherit text-[15px]">Facebook</h2>
            </Card>
            <Card radioInputValue={"Tiktok"}>
              <Image src={tiktokIcon} alt="tiktok icon" />
              <h2 className="font-bold text-inherit text-[15px]">Tiktok</h2>
            </Card>
            <Card radioInputValue={"Google"}>
              <Image src={googleIcon} alt="google icon" />
              <h2 className="font-bold text-inherit text-[15px]">Google</h2>
            </Card>
            <Card radioInputValue={"Youtube"}>
              <Image src={youtubeIcon} alt="youtube icon" />
              <h2 className="font-bold text-inherit text-[15px]">Youtube</h2>
            </Card>
            <Card radioInputValue={"Friends/Family"}>
              <Image src={friendsAndFamilyIcon} alt="friends and family icon" />
              <h2 className="font-bold text-inherit text-[15px]">
                Friends/Family
              </h2>
            </Card>
            <Card radioInputValue={"Other"}>
              <Image src={otherIcon} alt="other icon" />
              <h2 className="font-bold text-inherit text-[15px]">Other</h2>
            </Card>
          </div>
        </RadioGroup.Root>
        <Button
          onClick={() => nextStep()}
          size={"full"}
          className="mx-auto "
          disabled={!Boolean(selectedSource)}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
}

export default DiscoveryStep;

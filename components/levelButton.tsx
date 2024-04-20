"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import * as Progress from "@radix-ui/react-progress";

import starIcon from "@/app/_assets/starIcon.svg";
import lockIcon from "@/app/_assets/lockIcon.svg";

type LevelButtonProps = {
  locked: boolean;
  completed: boolean;
  first: boolean;
  id: number;
};
function LevelButton({ locked, completed, first, id }: LevelButtonProps) {
  return (
    <div className="relative flex justify-center items-center w-[98px] h-[93px]">
      <Button
        href={`/dashboard/challenges?challengeId=${id}`}
        variant={"level"}
        size="level"
        disabled={locked}
      >
        {locked ? (
          <Image src={lockIcon} alt="" />
        ) : (
          <Image src={starIcon} alt="" />
        )}
      </Button>

      {first && (
        <div className="absolute -top-1/2 right-1/2 animate border-solid border-2 border-light-grey text-[#58CC02] p-3.5 bg-white font-bold rounded-[10px]">
          START
        </div>
      )}

      {/* todo: add aria attributes for accesibility */}
      <div
        className={`${
          locked ? "" : completed ? "progressCircleFull" : "progressCircleEmpty"
        } w-[98px] h-[93px] rounded-full absolute top-[1px] left-0 -z-10`}
      ></div>
    </div>
  );
}
export default LevelButton;

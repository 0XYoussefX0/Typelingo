"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import starIcon from "@/app/_assets/starIcon.svg";
import lockIcon from "@/app/_assets/lockIcon.svg";
import prizeIcon from "@/app/_assets/prizeIcon.svg";

type LevelButtonProps = {
  locked: boolean;
  completed: boolean;
  first: boolean;
  id: number;
  nextChallengeId: number;
  last: boolean;
};
function LevelButton({
  locked,
  completed,
  first,
  id,
  nextChallengeId,
  last,
}: LevelButtonProps) {
  return (
    <div className="relative flex justify-center items-center w-[98px] h-[93px]">
      <Button
        variant={"level"}
        size="level"
        {...(locked
          ? { disabled: true }
          : {
              "aria-label": `link to challenge ${id}`,
              href: `/dashboard/challenges?challengeId=${id}&nextChallengeId=${nextChallengeId}`,
            })}
      >
        {last ? (
          <Image src={prizeIcon} alt="" />
        ) : locked ? (
          <Image src={lockIcon} alt="" />
        ) : first ? (
          <Image src={starIcon} alt="" />
        ) : null}
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

"use client";

import ProgressBar from "@/components/ui/progressBar";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import closeIcon from "@/app/_assets/closeIcon.svg";

import { challengeStatusStore } from "./challengeBanner";

function ChallengeProgressBar() {
  const challengeStatus = challengeStatusStore(
    (state) => state.challengeStatus
  );
  return (
    <div className="flex gap-4 justify-center items-center w-screen pt-11">
      <Button variant="noStyling" size="fit" href="/dashboard">
        <Image src={closeIcon} alt="" />
      </Button>
      <ProgressBar
        progressBarColor={"bg-[#58CC02]"}
        currentStepIndex={challengeStatus === "passed" ? 1 : 0}
      />
    </div>
  );
}

export default ChallengeProgressBar;

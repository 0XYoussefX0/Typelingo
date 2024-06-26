"use client";
import { useRef } from "react";

import { editor } from "monaco-editor";
import { challengeStatusStore } from "./challengeBanner";

import CodeEdtior from "./ui/codeEditor";

type ChallengeProps = {
  challengeCode: string;
  challengeTitle: string;
  challengeDescription: string;
};

function Challenge({
  challengeCode,
  challengeTitle,
  challengeDescription,
}: ChallengeProps) {
  const challengeStatus = challengeStatusStore(
    (state) => state.challengeStatus
  );

  return (
    <main
      className={`flex flex-col gap-20 items-center justify-between mt-10 flex-1 ${
        challengeStatus === "exit" ? "challenge-out" : "challenge-in"
      }`}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-10 w-full">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-center font-bold text-[28px] text-dark-grey">
            {challengeTitle}
          </h1>
          <p className="font-medium text-[#3C3C3C] text-center w-[70%]">
            {challengeDescription}
          </p>
        </div>
        <CodeEdtior challengeCode={challengeCode} />
      </div>
    </main>
  );
}

export default Challenge;

"use client";

import { Button } from "@/components/ui/button";

import Image from "next/image";

import { useRouter } from "next/navigation";

import closeIcon from "@/app/_assets/closeIcon.svg";
import checkmarkIcon from "@/app/_assets/checkmarkIcon.svg";
import XIcon from "@/app/_assets/Xicon.svg";
import codeIcon from "@/app/_assets/codeIcon.svg";
import videoIcon from "@/app/_assets/videoIcon.svg";

import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

import { create } from "zustand";

import { typesForTesting } from "@/lib/types";

import { editorRefStore } from "./ui/codeEditor";
import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { invalidateCache } from "@/app/_actions/invalidateCache";

type ChallengeStatusStore = {
  challengeStatus: "passed" | "failed" | "pending" | "exit" | undefined;
  setChallengeStatus: (status: ChallengeStatusStore["challengeStatus"]) => void;
};
export const challengeStatusStore = create<ChallengeStatusStore>((set) => ({
  challengeStatus: undefined,
  setChallengeStatus: (status) => set({ challengeStatus: status }),
}));

type ChallengeBannerProps = {
  currentChallengeId: number;
  challengeName: string;
  videoSolutionLink: string;
  challengeType: Challenge["type"];
  children: React.ReactNode;
  user: User;
  nextChallengeId: number;
  encodedNextChallengesIds: string;
};

function ChallengeBannner({
  currentChallengeId,
  challengeName,
  videoSolutionLink,
  challengeType,
  user,
  children,
  nextChallengeId,
  encodedNextChallengesIds,
}: ChallengeBannerProps) {
  const challengeStatus = challengeStatusStore(
    (state) => state.challengeStatus
  );
  const setChallengeStatus = challengeStatusStore(
    (state) => state.setChallengeStatus
  );

  const supabase = createClient();

  const editorRef = editorRefStore((state) => state.editorRef);

  const router = useRouter();

  useEffect(() => {
    setChallengeStatus(undefined);
  }, [currentChallengeId]);

  const check = async () => {
    setChallengeStatus("pending");
    if (!editorRef) return;
    const userCode = editorRef.getValue();

    const finalCode = typesForTesting + userCode;

    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: finalCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.solution === "correct") {
          console.log("correct");
          setChallengeStatus("passed");
        } else {
          console.log("incorrect");
          setChallengeStatus("failed");
        }
      });
  };

  const retry = () => {
    setChallengeStatus(undefined);
  };

  const skip = async () => {
    const { error } = await supabase.rpc("skip_challenge", {
      challengeid: currentChallengeId,
      id: user.id,
    });
    await invalidateCache("userData");
    // handle the error

    nextChallenge();
  };

  const continueToNextChallenge = async () => {
    const { error } = await supabase.rpc("completed_challenge", {
      challengeid: currentChallengeId,
      id: user.id,
      challenge_xp: {
        date: String(new Date()),
        xp: 5,
      },
    });
    await invalidateCache("userData");

    // handle the error
    nextChallenge();
  };

  const nextChallenge = () => {
    setChallengeStatus("exit");
    setTimeout(() => {
      router.push(
        `/dashboard/challenges?challengeId=${nextChallengeId}&nextChallengesIds=${encodedNextChallengesIds}`
      );
    }, 0);
  };

  return (
    <>
      {challengeStatus === undefined ||
      challengeStatus === "pending" ||
      challengeStatus === "exit" ? (
        <div className="h-[140px] border-t-2 border-light-grey border-solid flex justify-between w-full items-center px-[10%]">
          <Button
            disabled={
              challengeStatus === "exit" || challengeStatus === "pending"
            }
            variant={"secondary"}
            size={"arbitrary"}
            className="w-[149px]"
            onClick={() => skip()}
          >
            SKIP
          </Button>
          <Button
            className="w-[159px]"
            size={"arbitrary"}
            onClick={() => check()}
            disabled={
              challengeStatus === "exit" || challengeStatus === "pending"
            }
          >
            {challengeStatus === "pending" ? "LOADING ..." : "CHECK"}
          </Button>
        </div>
      ) : challengeStatus === "passed" ? (
        <div className="bg-[#D7FFB8] h-[140px] border-t-2 border-light-grey border-solid flex justify-between w-full items-center px-[10%]">
          <div className="flex gap-4 items-center">
            <div className="bg-white rounded-full flex items-center justify-center w-[80px] h-[80px]">
              <Image src={checkmarkIcon} alt="" />
            </div>
            <span className="text-[#489D26] font-medium text-2xl">
              Good Job!!
            </span>
          </div>
          <Button
            className="w-[151px]"
            size={"arbitrary"}
            onClick={() => continueToNextChallenge()}
          >
            CONTINUE
          </Button>
        </div>
      ) : challengeStatus === "failed" ? (
        <div className="bg-[#FFDADC] pt-[45px] border-t-2 border-light-grey border-solid flex justify-between w-full items-center px-[10%]">
          <div className="flex gap-4 items-center">
            <div className="bg-white rounded-full flex items-center justify-center w-[80px] h-[80px]">
              <Image src={XIcon} alt="" />
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-[#EE282D] font-medium text-2xl">
                Correct solution:
              </span>
              <div className="flex gap-3">
                <Dialog>
                  <DialogTrigger className="flex gap-1.5 items-center bg-transparent border-transparent p-0 border-none cursor-pointer">
                    <Image src={codeIcon} alt="" />
                    <span className="font-medium text-[#F35D61]">
                      VIEW CODE SOLUTION
                    </span>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogOverlay />
                    <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-[40%] h-[90%] translate-x-[-50%] translate-y-[-50%] gap-4 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                      {children}
                    </DialogContent>
                  </DialogPortal>
                </Dialog>

                <Dialog>
                  <DialogTrigger className="flex gap-1.5 items-center bg-transparent border-transparent p-0 border-none">
                    <Image src={videoIcon} alt="" />
                    <span className="font-medium text-[#F35D61]">
                      VIEW VIDEO SOLUTION
                    </span>
                  </DialogTrigger>
                  <DialogPortal>
                    <DialogOverlay />
                    <DialogContent className="fixed left-[50%] top-[50%] z-50 flex flex-col bg-[#fff] w-[70%] translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 pt-2 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                      <DialogClose className=" flex justify-end relative  h-5 ">
                        <Image
                          src={closeIcon}
                          alt=""
                          className="absolute top-1 -right-3"
                        />
                      </DialogClose>
                      <div className="relative w-full pb-[56.25%]">
                        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center">
                          <iframe
                            width="100%"
                            height="100%"
                            src={videoSolutionLink}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          ></iframe>
                          <div className="flex justify-center absolute -bottom-5">
                            <a
                              href={videoSolutionLink}
                              className="videoLink relative text-xs font-medium text-dark-blue-sky border-b-blue-sky border-b border-dashed"
                            >
                              {/* use the title of the challenge + remove the with x person + change the #number to the challengeId and then change the challenge type that is inside the square brackets */}
                              {challengeName} - Typescript Type Challenges #
                              {currentChallengeId} [
                              {challengeType.toUpperCase()}]{" "}
                            </a>
                            <span className="text-dark-grey text-xs font-medium ml-1">
                              {" "}
                              © Michigan TypeScript
                            </span>
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  </DialogPortal>
                </Dialog>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <Button
              className="w-[151px] bg-[#FF4347] border-[#FF4347] border-b-[#EE282D]"
              onClick={() => retry()}
              size={"arbitrary"}
            >
              RETRY
            </Button>
            <Button
              variant="secondary"
              className="w-[151px] bg-[#fff]"
              onClick={() => skip()}
              size={"arbitrary"}
            >
              SKIP
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ChallengeBannner;

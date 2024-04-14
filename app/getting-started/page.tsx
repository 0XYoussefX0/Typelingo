"use client";

import ProgressBar from "@/components/ui/progressBar";

import Image from "next/image";
import backIcon from "@/app/_assets/backIcon.svg";

import DiscoveryStep from "@/components/DiscoveryStep";
import DailyGoalStep from "@/components/DailyGoalStep";
import NotificationsStep from "@/components/NotificationsStep";
import LinkGithubStep from "@/components/LinkGithubStep";

import { Button } from "@/components/ui/button";

import { useSearchParams, useRouter } from "next/navigation";

type AvailableSteps =
  | "DiscoveryStep"
  | "DailyGoalStep"
  | "NotificationsStep"
  | "LinkGithubStep";

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = (searchParams.get("Step") ?? "DiscoveryStep") as AvailableSteps;

  // if there is no step param
  if (!searchParams.get("Step")) {
    sessionStorage.setItem("previousStep", JSON.stringify("DiscoveryStep"));
    sessionStorage.setItem("currentStepIndex", JSON.stringify(1 / 5));
  }

  const availableSteps = [
    "DiscoveryStep",
    "DailyGoalStep",
    "NotificationsStep",
    "LinkGithubStep",
  ];
  // if the value of the step param is not in the available steps, redirect to the first step
  if (!availableSteps.includes(step)) {
    sessionStorage.setItem("previousStep", JSON.stringify("DiscoveryStep"));
    sessionStorage.setItem("currentStepIndex", JSON.stringify(1 / 5));
    router.push("/getting-started?Step=DiscoveryStep");
    return;
  }

  const steps = {
    DiscoveryStep: <DiscoveryStep />,
    DailyGoalStep: <DailyGoalStep />,
    NotificationsStep: <NotificationsStep />,
    LinkGithubStep: <LinkGithubStep />,
  };

  const isFirstStep = step === "DiscoveryStep";

  const previousStep = JSON.parse(
    sessionStorage.getItem("previousStep") ?? JSON.stringify("DiscoveryStep")
  );
  let currentStepIndex = JSON.parse(
    sessionStorage.getItem("currentStepIndex") ?? JSON.stringify(1 / 5)
  );

  if (step === "DiscoveryStep") {
    currentStepIndex = 1 / 5;
  }

  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex gap-4 justify-center items-center w-screen pt-11">
        <Button
          variant="noStyling"
          size="fit"
          {...(isFirstStep
            ? { href: "/" }
            : {
                onClick: () => {
                  currentStepIndex -= 1 / 5;
                  sessionStorage.setItem(
                    "currentStepIndex",
                    JSON.stringify(currentStepIndex)
                  );
                  const indexOfPreviousStep =
                    availableSteps.indexOf(previousStep);
                  if (!(indexOfPreviousStep - 1 === -1)) {
                    sessionStorage.setItem(
                      "previousStep",
                      JSON.stringify(availableSteps[indexOfPreviousStep - 1])
                    );
                  }
                  router.push(`/getting-started?Step=${previousStep}`);
                },
              })}
          aria-label={
            isFirstStep
              ? "Go back to the home page"
              : "Go back to the previous Step"
          }
        >
          <Image src={backIcon} alt="" />
        </Button>
        <ProgressBar currentStepIndex={currentStepIndex} />
      </div>
      <main className="flex-1 flex items-center justify-center my-10">
        {steps[step]}
      </main>
    </div>
  );
}

export default Page;

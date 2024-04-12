"use client";

import ProgressBar from "@/components/ui/progressBar";

import Image from "next/image";
import backIcon from "@/app/_assets/backIcon.svg";

import DiscoveryStep from "@/components/DiscoveryStep";
import DailyGoalStep from "@/components/DailyGoalStep";
import Step3 from "@/components/step3";

import { Button } from "@/components/ui/button";

import { useSearchParams, useRouter } from "next/navigation";

type AvailableSteps = "DiscoveryStep" | "DailyGoalStep" | "Step3";

function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const step = (searchParams.get("Step") ?? "DiscoveryStep") as AvailableSteps;

  const availableSteps = ["DiscoveryStep", "DailyGoalStep", "step3"];
  if (!availableSteps.includes(step)) {
    router.push("/getting-started?Step=DiscoveryStep");
    return;
  }

  const steps = {
    DiscoveryStep: <DiscoveryStep />,
    DailyGoalStep: <DailyGoalStep />,
    Step3: <Step3 />,
  };

  const isFirstStep = step === "DiscoveryStep";

  const previousStep = JSON.parse(
    sessionStorage.getItem("previousStep") ?? '"DiscoveryStep"'
  );
  let currentStepIndex = JSON.parse(
    sessionStorage.getItem("currentStepIndex") ?? String(1 / 5)
  );

  return (
    <>
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
                  router.push(`/getting-started?step=${previousStep}`);
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
      <main className="mt-[163px]">{steps[step]}</main>
    </>
  );
}

export default Page;

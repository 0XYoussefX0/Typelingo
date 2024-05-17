"use client";

import ProgressBar from "@/components/ui/progressBar";

import Image from "next/image";
import backIcon from "@/app/_assets/backIcon.svg";

import { Button } from "@/components/ui/button";

import { useSearchParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// this is necessary to opt out of server side rendering

const DiscoveryStep = dynamic(() => import("@/components/DiscoveryStep"), {
  ssr: false,
});
const LinkGithubStep = dynamic(() => import("@/components/LinkGithubStep"), {
  ssr: false,
});

type AvailableSteps = "DiscoveryStep" | "LinkGithubStep";

function GettingStartedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  if (typeof window === "undefined") {
    return <div></div>;
  }
  const step = (searchParams.get("Step") ?? "DiscoveryStep") as AvailableSteps;

  // if there is no step param
  if (!searchParams.get("Step")) {
    sessionStorage.setItem("previousStep", JSON.stringify("DiscoveryStep"));
    sessionStorage.setItem("currentStepIndex", JSON.stringify(1 / 3));
  }

  const availableSteps = ["DiscoveryStep", "LinkGithubStep"];
  // if the value of the step param is not in the available steps, redirect to the first step
  if (!availableSteps.includes(step)) {
    sessionStorage.setItem("previousStep", JSON.stringify("DiscoveryStep"));
    sessionStorage.setItem("currentStepIndex", JSON.stringify(1 / 3));
    router.push("/getting-started?Step=DiscoveryStep");
    return;
  }

  const steps = {
    DiscoveryStep: <DiscoveryStep />,
    LinkGithubStep: <LinkGithubStep />,
  };

  const isFirstStep = step === "DiscoveryStep";

  const previousStep = JSON.parse(
    sessionStorage.getItem("previousStep") ?? JSON.stringify("DiscoveryStep")
  );
  let currentStepIndex = JSON.parse(
    sessionStorage.getItem("currentStepIndex") ?? JSON.stringify(1 / 3)
  );

  if (step === "DiscoveryStep") {
    currentStepIndex = 1 / 3;
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
                  currentStepIndex -= 1 / 3;
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
        <ProgressBar
          progressBarColor={"bg-[#58CC02]"}
          currentStepIndex={currentStepIndex}
        />
      </div>
      <main className="flex-1 flex items-center justify-center my-10">
        {steps[step]}
      </main>
    </div>
  );
}

function Page() {
  if (typeof window === "undefined") {
    return <div></div>;
  }
  return <GettingStartedPage />;
}

export default Page;

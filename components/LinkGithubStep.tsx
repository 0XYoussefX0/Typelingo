"use client";

import { Button } from "./ui/button";

import { useRouter } from "next/navigation";

function LinkGithubStep() {
  const router = useRouter();
  const nextStep = (LinkStatus?: string) => {
    sessionStorage.setItem("currentStepIndex", JSON.stringify(3 / 3));
    sessionStorage.setItem(
      "LinkGithub",
      JSON.stringify(LinkStatus === "granted")
    );
    sessionStorage.setItem("previousStep", JSON.stringify("DiscoveryStep"));
    router.push("/signUp");
  };

  return (
    <div className="flex flex-col gap-11 items-center w-[90%] sm:w-[640px]">
      <h1 className="text-center font-bold text-[28px] text-dark-grey">
        Interested in signing up using your GitHub profile? It allows automatic
        commits of your solutions to a repo.
      </h1>
      <div className="flex flex-col gap-4">
        <Button onClick={() => nextStep("granted")}>YES</Button>
        <Button variant={"secondary"} onClick={() => nextStep()}>
          NO
        </Button>
      </div>
    </div>
  );
}

export default LinkGithubStep;

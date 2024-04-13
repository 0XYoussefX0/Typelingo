"use client";

import { Button } from "./ui/button";

import { useRouter } from "next/navigation";

function NotificationsStep() {
  const router = useRouter();
  const nextStep = (permissionStatus?: string) => {
    sessionStorage.setItem("currentStepIndex", JSON.stringify(4 / 5));
    sessionStorage.setItem(
      "activatedNotification",
      JSON.stringify(permissionStatus === "permission Is Granted")
    );
    sessionStorage.setItem("previousStep", JSON.stringify("NotificationsStep"));
    router.push("/getting-started?Step=LinkGithubStep");
  };

  const getUserPermission = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      nextStep("permission Is Granted");
    } else {
      alert(
        "You have denied the notification permission. You can enable it in the browser settings."
      );
    }
  };

  return (
    <div className="flex flex-col gap-11 items-center">
      <h1 className="text-center font-bold text-[28px] text-dark-grey">
        Want us to help you keep your daily goal?
      </h1>
      <div className="flex flex-col gap-4">
        <Button onClick={() => getUserPermission()}>YES</Button>
        <Button variant={"secondary"} onClick={() => nextStep()}>
          NOT NOW
        </Button>
      </div>
    </div>
  );
}

export default NotificationsStep;

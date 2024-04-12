"use client";

import * as RadioGroup from "@radix-ui/react-radio-group";
import { Button } from "@/components/ui/button";

import { useState } from "react";

import { useRouter } from "next/navigation";

function DailyGoalStep() {
  const router = useRouter();
  const [dailyGoal, setDailyGoal] = useState(
    JSON.parse(sessionStorage.getItem("dailyGoal") ?? '""')
  );

  const possibleDailyGoals = [
    { id: "1", label: "Casual", duration: "5 min / day" },
    { id: "2", label: "Regular", duration: "10 min / day" },
    { id: "3", label: "Serious", duration: "15 min / day" },
    { id: "4", label: "Intense", duration: "20 min / day" },
  ];

  const nextStep = () => {
    sessionStorage.setItem("currentStepIndex", JSON.stringify(3 / 5));
    sessionStorage.setItem("dailyGoal", JSON.stringify(dailyGoal));
    sessionStorage.setItem("previousStep", JSON.stringify("DailyGoalStep"));
    router.push("/getting-started?Step=NotificationsStep");
  };

  return (
    <div className="px-6 flex justify-center items-center flex-col gap-6 w-fit mx-auto">
      <h1 className="text-center font-bold text-[28px] text-dark-grey">
        Great. Now choose a daily goal.
      </h1>
      <RadioGroup.Root
        value={dailyGoal}
        onValueChange={setDailyGoal}
        className="flex flex-col rounded-2xl border-2 border-solid border-light-grey w-[580px] gap-0.5"
      >
        {possibleDailyGoals.map(({ id, label, duration }, index) => (
          <RadioGroup.Item
            key={id}
            value={duration}
            className={`flex justify-between data-[state=unchecked]:text-dark-grey py-3 px-4 data-[state=checked]:text-dark-blue data-[state=checked]:outline data-[state=checked]:outline-2 data-[state=checked]:outline-dark-blue ${
              index === 0 ? "rounded-t-2xl" : ""
            } ${
              index !== possibleDailyGoals.length - 1
                ? "shadow-grey"
                : "rounded-b-2xl"
            }`}
          >
            <span className="font-bold text-[15px]">{label}</span>
            <span className="font-medium text-[15px]">{duration}</span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
      <Button
        className="w-full"
        disabled={!Boolean(dailyGoal)}
        onClick={() => nextStep()}
      >
        CONTINUE
      </Button>
    </div>
  );
}

export default DailyGoalStep;

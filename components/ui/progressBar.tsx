"use client";

import * as Progress from "@radix-ui/react-progress";

import { useEffect, useState } from "react";

function ProgressBar({
  currentStepIndex,
  progressBarColor,
}: {
  currentStepIndex: number;
  progressBarColor: `bg-${string}`;
}) {
  const [progress, setProgress] = useState(currentStepIndex * 100);

  useEffect(() => {
    setProgress(currentStepIndex * 100);
  }, [currentStepIndex]);

  return (
    <Progress.Root
      value={progress}
      className="h-4 w-3/4 rounded-lg bg-light-grey overflow-hidden"
    >
      <Progress.Indicator
        className={`${progressBarColor} rounded-lg h-full relative progressIndicator transition-transform duration-300`}
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
}

export default ProgressBar;

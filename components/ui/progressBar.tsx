"use client";

import React from "react";
import * as Progress from "@radix-ui/react-progress";

import { useEffect } from "react";

function ProgressBar({ currentStepIndex }: { currentStepIndex: number }) {
  const [progress, setProgress] = React.useState(currentStepIndex * 100);

  useEffect(() => {
    setProgress(currentStepIndex * 100);
  }, [currentStepIndex]);

  console.log(currentStepIndex);
  return (
    <Progress.Root
      value={progress}
      className="h-4 w-3/4 rounded-lg bg-light-grey overflow-hidden"
    >
      <Progress.Indicator
        className="bg-[#58CC02] rounded-lg h-full relative progressIndicator transition-transform"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
}

export default ProgressBar;

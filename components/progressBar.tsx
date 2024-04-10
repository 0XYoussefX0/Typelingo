"use client";

import React from "react";
import * as Progress from "@radix-ui/react-progress";

function ProgressBar() {
  const [progress, setProgress] = React.useState(13);
  return (
    <Progress.Root
      value={progress}
      className="h-4 w-3/4 rounded-lg bg-light-grey overflow-hidden"
    >
      <Progress.Indicator
        className="bg-[#58CC02] rounded-lg h-full relative progressIndicator"
        style={{ transform: `translateX(-${100 - progress}%)` }}
      />
    </Progress.Root>
  );
}

export default ProgressBar;

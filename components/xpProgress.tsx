"use client";

import treasureIcon from "@/app/_assets/treasureIcon.svg";

import Image from "next/image";
import ProgressBar from "./ui/progressBar";

import { ResponsiveLine } from "@nivo/line";

type XpProgressProps = {
  xpProgress: { date: string; xp: number }[];
};
function XpProgress({ xpProgress }: XpProgressProps) {
  // first loop to get the last 7 days worth of xpProgress
  const today = new Date();
  today.setHours(0, 0, 0, 0); // set time to start of day

  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);
  sevenDaysAgo.setHours(0, 0, 0, 0); // set time to start of day

  // Filter out xpProgress older than 7 days and merge XP for the same dates
  const mergedXpProgress: { date: string; xp: number }[] = xpProgress
    .filter(({ date }) => new Date(date) >= sevenDaysAgo)
    .reduce((acc: { date: string; xp: number }[], { date, xp }) => {
      const formattedDate = date.split(" ").slice(0, 4).join(" ");
      const existing = acc.find((item) => item.date === formattedDate);
      if (existing) {
        existing.xp += xp;
      } else {
        acc.push({ date: formattedDate, xp });
      }
      return acc;
    }, []);

  // Fill in missing days with 0 XP
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    date.setHours(0, 0, 0, 0); // set time to start of day
    const formattedDate = date.toString().split(" ").slice(0, 4).join(" ");
    if (!mergedXpProgress.some((item) => item.date === formattedDate)) {
      mergedXpProgress.push({ date: formattedDate, xp: 0 });
    }
  }

  // Sort by date
  // @ts-ignore
  mergedXpProgress.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Create chart data
  const chartData = mergedXpProgress.map(({ date, xp }) => ({
    x: date.slice(0, 2),
    y: xp,
  }));

  const todaysXp = mergedXpProgress[6].xp;

  const data = [
    {
      id: "XP",
      color: "hsl(9, 70%, 50%)",
      data: chartData,
    },
  ];

  return (
    <div className="rounded-2xl p-6 hidden w-[380px] xl:flex xl:flex-col xl:gap-5 border-2 border-solid border-light-grey h-fit">
      <h1 className="font-bold text-[22px] text-dark-grey">XP Progress</h1>
      <div className="flex gap-4 items-center">
        <Image src={treasureIcon} alt="" />
        <div className="flex flex-col gap-3 flex-1">
          <div className="font-medium text-dark-grey">Daily Goal</div>
          <div className="flex gap-3 items-center">
            <ProgressBar
              progressBarColor="bg-[#FFC800]"
              currentStepIndex={todaysXp / 20}
            />
            <div className="text-disabled-grey font-medium">
              {todaysXp}/20XP{" "}
            </div>
          </div>
        </div>
      </div>
      <div className="h-[220px]">
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 15, bottom: 30, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            max: 20,
            min: 0,
            stacked: true,
          }}
          enableSlices="x"
          pointColor={"#fff"}
          pointBorderWidth={2}
          colors={"#FFC800"}
          enableArea={true}
          yFormat=" >-.2f"
          axisTop={null}
          axisRight={null}
          gridYValues={5}
          axisBottom={{
            tickSize: 0,
            tickPadding: 7,
            tickRotation: 0,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickValues: 5,
            tickSize: 0,
            tickPadding: 7,
            tickRotation: 0,
            truncateTickAt: 0,
          }}
          enableGridX={false}
          pointSize={10}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          enableTouchCrosshair={true}
          useMesh={true}
          theme={{
            axis: {
              ticks: {
                text: {
                  fill: "#CCCAC9",
                  fontSize: 17,
                  fontFamily: "inherit",
                },
              },
            },
          }}
          legends={[
            {
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </div>
    </div>
  );
}

export default XpProgress;

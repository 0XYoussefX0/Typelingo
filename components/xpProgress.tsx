"use client";

import treasureIcon from "@/app/_assets/treasureIcon.svg";

import Image from "next/image";
import ProgressBar from "./ui/progressBar";

import { ResponsiveLine } from "@nivo/line";
function XpProgress() {
  const data = [
    {
      id: "XP",
      color: "hsl(9, 70%, 50%)",
      data: [
        {
          x: "M",
          y: 0,
        },
        {
          x: "Tu",
          y: 0,
        },
        {
          x: "W",
          y: 20,
        },
        {
          x: "Th",
          y: 90,
        },
        {
          x: "F",
          y: 2,
        },
        {
          x: "Sa",
          y: 0,
        },
        {
          x: "Su",
          y: 500,
        },
      ],
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
              currentStepIndex={13 / 20}
            />
            <div className="text-disabled-grey font-medium">13/20XP </div>
          </div>
        </div>
      </div>
      <div className="h-[220px]">
        <ResponsiveLine
          data={data}
          margin={{ top: 10, right: 10, bottom: 30, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            max: 1000,
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

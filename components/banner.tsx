import React from "react";

type BannerProps = {
  bannerColor: string;
  bannerTitle: string;
  bannerText: string;
};

function Banner({ bannerColor, bannerTitle, bannerText }: BannerProps) {
  return (
    <div
      className={`flex flex-col gap-2 ${bannerColor} text-white px-4 py-5 rounded-[13px] sticky top-4 left-0 z-10 `}
    >
      <h1 className="font-bold text-2xl">{bannerTitle}</h1>
      <p className="font-medium text-base ">{bannerText}</p>
    </div>
  );
}

export default Banner;

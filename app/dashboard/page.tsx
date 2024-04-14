import Image from "next/image";
import logo from "@/app/_assets/logo.svg";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Banner from "@/components/banner";

import streakIcon from "@/app/_assets/streakIcon.svg";
import homeIcon from "@/app/_assets/homeIcon.svg";

import mLogo from "@/app/_assets/mlogo.svg";

function Page() {
  return (
    <div className="flex items-start">
      <nav className="fixed bottom-0 left-0 w-screen md:top-0 md:left-0 h-[90px] border-t-2 border-solid border-light-grey md:static md:h-screen md:w-fit md:px-4 md:border-t-0 md:border-r-2 ">
        <ul className="h-full">
          <li className="flex h-full items-center justify-center md:justify-start flex-col md:pt-9 gap-6">
            <Link
              href="/"
              aria-label="Go to the home page"
              className="hidden md:inline"
            >
              <Image src={mLogo} alt="" width={40} height={40} />
            </Link>
            <Link
              href="/dashboard"
              aria-label="Go to the dashboard"
              className="bg-[#DDF4FF] border-2 border-solid border-[#84D8FF] rounded-2xl w-fit h-fit md:w-[56px] md:h-[56px] flex justify-center items-center"
            >
              <Image
                src={homeIcon}
                alt=""
                className="w-[50px] h-[50px] md:w-8 md:h-8"
              />
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <nav className="flex justify-between w-full md:flex-1">
          <Link href="/" className="hidden">
            <Image src={logo} alt="typelingo's Logo" />
          </Link>
          <div className="flex items-center gap-8 px-2.5 py-2.5 justify-between w-full">
            <div className="flex items-center gap-1.5">
              <Image src={streakIcon} alt="" />
              <div className="text-[#FF9600] font-bold">0</div>
            </div>
            <div className="rounded-full w-9 h-9 bg-black"></div>
            {/* <Image src={userImage} alt="" /> */}
          </div>
        </nav>
        <div>
          <Banner
            bannerColor="bg-[#58CC02]"
            bannerTitle="Easy"
            bannerText="Form basic sentences, greet people"
          />
        </div>
      </main>
    </div>
  );
}

export default Page;

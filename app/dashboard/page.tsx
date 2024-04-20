import Image from "next/image";
import logo from "@/app/_assets/blueLogo.svg";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Banner from "@/components/banner";

import homeIcon from "@/app/_assets/homeIcon.svg";

import mLogo from "@/app/_assets/mlogo.svg";
import LevelButton from "@/components/levelButton";
import LevelsLayout from "@/components/levelsLayout";
import XpProgress from "@/components/xpProgress";
import { createClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";

async function Page() {
  const supabase = createClient();

  const { data: userSession, error: userSessionError } =
    await supabase.auth.getUser();

  // user is going to be defined since this route is protected by the middleware
  const user = userSession.user as User;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("userId", user.id)
    .single();

  if (!data) {
    return <div>User not found</div>;
  }

  const { data: challengesData, error: challengesError } = await supabase
    .from("challenges")
    .select("id, type");

  if (!challengesData || challengesError) {
    return <div>Error</div>;
  }

  const easyChallenges = [];
  const mediumChallenges = [];
  const hardChallenges = [];
  const extremeChallenges = [];

  for (const challenge of challengesData) {
    if (challenge.type === "easy") {
      easyChallenges.push(challenge);
    } else if (challenge.type === "medium") {
      mediumChallenges.push(challenge);
    } else if (challenge.type === "hard") {
      hardChallenges.push(challenge);
    } else if (challenge.type === "extreme") {
      extremeChallenges.push(challenge);
    }
  }
  /* make sure that you give each nav element an aria label like primary navigation and secondary navigation or something like that */
  return (
    <div className="flex items-start">
      <nav className="fixed bottom-0 left-0 w-screen md:top-0 md:left-0 h-[90px] border-t-2 border-solid border-light-grey md:static md:h-screen md:w-fit md:px-4 md:border-t-0 md:border-r-2 z-10 bg-white lg:hidden">
        <ul className="h-full">
          <div className="flex h-full items-center justify-center md:justify-start flex-col md:pt-9 gap-6">
            <li className="hidden md:inline">
              <Link href="/" aria-label="Go to the home page">
                <Image src={mLogo} alt="" width={40} height={40} />
              </Link>
            </li>
            <li>
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
          </div>
        </ul>
      </nav>
      <main className="flex-1 flex flex-col">
        <div className="px-2.5 py-2.5 lg:px-4 lg:py-4 flex justify-between w-full md:flex-1 items-center lg:border-solid lg:border-b-2 lg:border-b-light-grey">
          <Link href="/" className="hidden lg:inline">
            <Image src={logo} alt="typelingo's Logo" />
          </Link>
          <div className="flex-1 lg:flex-none flex items-center gap-8 justify-end">
            <div className="rounded-full w-9 h-9 bg-black">
              {/* <Image src={userImage} alt="" /> */}
            </div>
          </div>
        </div>
        <div className="flex gap-12 mt-6 px-4 ">
          <nav className="hidden lg:inline">
            <ul>
              <li>
                <Button variant={"tab"}>
                  <Image src={homeIcon} alt="" className="w-8 h-8" />
                  <span>LEARN</span>
                </Button>
              </li>
            </ul>
          </nav>
          <div className="flex-1">
            <div className="mb-24 flex flex-col gap-[67px]">
              <Banner
                bannerColor="bg-[#58CC02]"
                bannerTitle="Easy"
                bannerText="Solidify your TypeScript foundation with these basic challenges."
              />
              <LevelsLayout>
                {easyChallenges.map(({ id }, index) => {
                  {
                    /* pass the same value of completed to the first attribute and implement some logic so that only the first element has the first attribute */
                  }
                  {
                    /* last element should have a prize icon */
                  }
                  // remove the type casting once the type of levels completed no longer can be null
                  const completed = data.levels_completed?.includes(
                    id
                  ) as boolean;
                  return (
                    <LevelButton
                      key={id}
                      id={id}
                      locked={!completed}
                      completed={completed}
                      first={index === 0}
                    />
                  );
                })}
              </LevelsLayout>
            </div>
            <div className="mb-24 flex flex-col gap-[67px]">
              <Banner
                bannerColor="bg-[#f7b500]"
                bannerTitle="Medium"
                bannerText="Dive deeper into TypeScript with these moderately complex exercises."
              />
              <LevelsLayout>
                {mediumChallenges.map(({ id }, index) => {
                  {
                    /* pass the same value of completed to the first attribute and implement some logic so that only the first element has the first attribute */
                  }
                  {
                    /* last element should have a prize icon */
                  }
                  // remove the type casting once the type of levels completed no longer can be null
                  const completed = data.levels_completed?.includes(
                    id
                  ) as boolean;
                  return (
                    <LevelButton
                      key={id}
                      id={id}
                      locked={!completed}
                      completed={completed}
                      first={index === 0}
                    />
                  );
                })}
              </LevelsLayout>
            </div>
            <div className="mb-24 flex flex-col gap-[67px]">
              <Banner
                bannerColor="bg-[#ff7f00]"
                bannerTitle="Hard"
                bannerText="Push your TypeScript skills with these advanced challenges."
              />
              <LevelsLayout>
                {hardChallenges.map(({ id }, index) => {
                  {
                    /* pass the same value of completed to the first attribute and implement some logic so that only the first element has the first attribute */
                  }
                  {
                    /* last element should have a prize icon */
                  }
                  // remove the type casting once the type of levels completed no longer can be null
                  const completed = data.levels_completed?.includes(
                    id
                  ) as boolean;
                  return (
                    <LevelButton
                      key={id}
                      id={id}
                      locked={!completed}
                      completed={completed}
                      first={index === 0}
                    />
                  );
                })}
              </LevelsLayout>
            </div>
            <div className="mb-24 flex flex-col gap-[67px]">
              <Banner
                bannerColor="bg-[#ff0000]"
                bannerTitle="Extreme"
                bannerText="Master the edge cases of TypeScript with these extreme puzzles."
              />
              <LevelsLayout>
                {extremeChallenges.map(({ id }, index) => {
                  {
                    /* pass the same value of completed to the first attribute and implement some logic so that only the first element has the first attribute */
                  }
                  {
                    /* last element should have a prize icon */
                  }
                  // remove the type casting once the type of levels completed no longer can be null
                  const completed = data.levels_completed?.includes(
                    id
                  ) as boolean;
                  return (
                    <LevelButton
                      key={id}
                      id={id}
                      locked={!completed}
                      completed={completed}
                      first={index === 0}
                    />
                  );
                })}
              </LevelsLayout>
            </div>
          </div>
          <XpProgress xpProgress={data.xp as number[]} />
        </div>
      </main>
    </div>
  );
}

export default Page;

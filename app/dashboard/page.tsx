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
import { unstable_cache } from "next/cache";

type ChallengeIdentifier = { [P in "id" | "type"]: Challenge[P] };

const getUserData = unstable_cache(
  async (supabase, userId) => {
    return supabase.from("profiles").select("*").eq("userid", userId).single();
  },
  ["userData"],
  {
    tags: ["userData"],
  }
);

async function Page() {
  const supabase = createClient();

  const { data: userSession, error: userSessionError } =
    await supabase.auth.getUser();

  // user is going to be defined since this route is protected by the middleware
  const user = userSession.user as User;

  // const { data, error } = await supabase
  //   .from("profiles")
  //   .select("*")
  //   .eq("userid", user.id)
  //   .single();

  const { data, error } = await getUserData(supabase, user.id);

  if (!data) {
    return <div>User not found</div>;
  }

  const { data: challengesData, error: challengesError } = await supabase
    .from("challenges")
    .select("id, type");

  if (!challengesData || challengesError) {
    return <div>Error</div>;
  }

  const easyChallenges: ChallengeIdentifier[] = [];
  const mediumChallenges: ChallengeIdentifier[] = [];
  const hardChallenges: ChallengeIdentifier[] = [];
  const extremeChallenges: ChallengeIdentifier[] = [];

  challengesData.sort((a, b) => a.id - b.id);

  const nextChallengesIds = challengesData.map((challenge) => challenge.id);
  const encodedNextChallengesIds = Buffer.from(
    JSON.stringify(nextChallengesIds)
  ).toString("base64");

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
                  const completed = data.levels_completed.includes(id);
                  const skipped = data.levels_skipped.includes(id);

                  const lastChallengeCompletedOrSkipped =
                    data.levels_completed.includes(
                      easyChallenges[index === 0 ? 0 : index - 1].id
                    ) ||
                    data.levels_skipped.includes(
                      easyChallenges[index === 0 ? 0 : index - 1].id
                    );

                  return (
                    <LevelButton
                      nextChallengesIds={encodedNextChallengesIds}
                      key={id}
                      id={id}
                      locked={
                        index === 0 || lastChallengeCompletedOrSkipped
                          ? false
                          : !completed && !skipped
                      }
                      completed={completed}
                      first={index === 0}
                      last={index === easyChallenges.length - 1}
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
                  const completed = data.levels_completed.includes(id);
                  const skipped = data.levels_skipped.includes(id);

                  const lastChallengeCompletedOrSkipped =
                    data.levels_completed.includes(
                      mediumChallenges[index === 0 ? 0 : index - 1].id
                    ) ||
                    data.levels_skipped.includes(
                      mediumChallenges[index === 0 ? 0 : index - 1].id
                    );
                  return (
                    <LevelButton
                      nextChallengesIds={encodedNextChallengesIds}
                      key={id}
                      id={id}
                      locked={
                        index === 0 || lastChallengeCompletedOrSkipped
                          ? false
                          : !completed && !skipped
                      }
                      completed={completed}
                      first={index === 0}
                      last={index === mediumChallenges.length - 1}
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
                  const completed = data.levels_completed.includes(id);

                  const skipped = data.levels_skipped.includes(id);

                  const lastChallengeCompletedOrSkipped =
                    data.levels_completed.includes(
                      mediumChallenges[index === 0 ? 0 : index - 1].id
                    ) ||
                    data.levels_skipped.includes(
                      mediumChallenges[index === 0 ? 0 : index - 1].id
                    );
                  return (
                    <LevelButton
                      nextChallengesIds={encodedNextChallengesIds}
                      key={id}
                      id={id}
                      locked={
                        index === 0 || lastChallengeCompletedOrSkipped
                          ? false
                          : !completed && !skipped
                      }
                      completed={completed}
                      first={index === 0}
                      last={index === hardChallenges.length - 1}
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
                  const completed = data.levels_completed.includes(id);
                  const skipped = data.levels_skipped.includes(id);

                  const lastChallengeCompletedOrSkipped =
                    data.levels_completed.includes(
                      mediumChallenges[index === 0 ? 0 : index - 1].id
                    ) ||
                    data.levels_skipped.includes(
                      mediumChallenges[index === 0 ? 0 : index - 1].id
                    );
                  return (
                    <LevelButton
                      nextChallengesIds={encodedNextChallengesIds}
                      key={id}
                      id={id}
                      locked={
                        index === 0 || lastChallengeCompletedOrSkipped
                          ? false
                          : !completed && !skipped
                      }
                      completed={completed}
                      first={index === 0}
                      last={index === extremeChallenges.length - 1}
                    />
                  );
                })}
              </LevelsLayout>
            </div>
          </div>
          <XpProgress xpProgress={data.xp} />
        </div>
      </main>
    </div>
  );
}

export default Page;

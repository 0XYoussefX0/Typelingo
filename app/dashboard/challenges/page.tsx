import { Code } from "bright";

import Challenge from "@/components/challenge";
import ChallengeBannner from "@/components/challengeBanner";
import ChallengeProgressBar from "@/components/challengeProgressBar";
import { createClient } from "@/lib/supabase/server";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentChallengeId = searchParams.challengeId
    ? Number(searchParams.challengeId)
    : 1;

  const encodedNextChallengesIds = searchParams.nextChallengesIds;

  if (!encodedNextChallengesIds) {
    return <h1>{"You broke the app :'( go back to the previous page"}</h1>;
  }

  const nextChallengesIds = JSON.parse(
    Buffer.from(encodedNextChallengesIds as string, "base64").toString("utf8")
  );

  const nextChallengeId =
    nextChallengesIds[
      (nextChallengesIds.indexOf(currentChallengeId) + 1) %
        nextChallengesIds.length
    ];

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return <div>You are not logged in</div>;

  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("id", currentChallengeId)
    .single();

  console.log(error);

  if (!data) {
    return <div>Challenge not found</div>;
  }

  if (data)
    return (
      <>
        <div className="flex flex-col w-full min-h-screen">
          <ChallengeProgressBar />
          <Challenge
            challengeTitle={data.name}
            challengeCode={data.code}
            challengeDescription={data.description}
          />
          <ChallengeBannner
            currentChallengeId={Number(currentChallengeId)}
            videoSolutionLink={data.video_solution}
            challengeName={data.name}
            challengeType={data.type}
            user={user}
            nextChallengeId={nextChallengeId}
            encodedNextChallengesIds={encodedNextChallengesIds as string}
            challengeDescription={data.description}
          >
            <Code lang="ts" className="codeSolutionContainer">
              {data.code_solution}
            </Code>
          </ChallengeBannner>
        </div>
      </>
    );
}

export default Page;

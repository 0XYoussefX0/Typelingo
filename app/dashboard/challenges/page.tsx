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
  const currentChallengeId = searchParams.challengeId ?? 1;

  const supabase = createClient();

  const { data, error } = await supabase
    .from("challenges")
    .select("*")
    .eq("id", currentChallengeId)
    .single();

  if (!data) {
    return <div>Challenge not found</div>;
  }

  if (data)
    return (
      <>
        <div className="flex flex-col w-full h-screen">
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
          >
            <Code lang="ts">{data.code_solution}</Code>
          </ChallengeBannner>
        </div>
      </>
    );
}

export default Page;

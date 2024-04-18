import { Code } from "bright";

import Challenge from "@/components/challenge";
import ChallengeBannner from "@/components/challengeBanner";
import ChallengeProgressBar from "@/components/challengeProgressBar";

function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const currentChallengeId = searchParams.challengeId ?? 1;

  /* the value of this variable is going to be coming from the challenges database */
  const value = `  

  /* _____________ Your Code Here _____________ */

  type Flatten<S extends any[], T extends any[] = []> =  S extends [infer X, ...infer Y] ? 
    X extends any[] ?
     Flatten<[...X, ...Y], T> : Flatten<[...Y], [...T, X]> 
    : T
  
  type cases = [
    Expect<Equal<Flatten<[]>, []>>,
    Expect<Equal<Flatten<[1, 2, 3, 4]>, [1, 2, 3, 4]>>,
    Expect<Equal<Flatten<[1, [2]]>, [1, 2]>>,
    Expect<Equal<Flatten<[1, 2, [3, 4], [[[5]]]]>, [1, 2, 3, 4, 5]>>,
    Expect<Equal<Flatten<[{ foo: 'bar', 2: 10 }, 'foobar']>, [{ foo: 'bar', 2: 10 }, 'foobar']>>,
  ]
  
  // @ts-expect-error
  type error = Flatten<'1'>
  
  `;

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <ChallengeProgressBar />
        <Challenge />
        <ChallengeBannner currentChallengeId={Number(currentChallengeId)}>
          <Code lang="ts">{value}</Code>
        </ChallengeBannner>
      </div>
    </>
  );
}

export default Page;

"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import githubLogo from "@/app/_assets/githubLogo.svg";
import { createClient } from "@/lib/supabase/client";
import { cookies } from "next/headers";

function GithubSignIn({ signUp }: { signUp: boolean }) {
  const supabase = createClient();
  let camefrom: string;
  if (signUp) {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      camefrom = sessionStorage.getItem("selectedSource")
        ? JSON.parse(sessionStorage.getItem("selectedSource") as string)
        : "Other";
    }
  }

  const handleGithubSignUp = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `http://localhost:3000/api/github?next=${"/dashboard"}&&signUp=${signUp}&&camefrom=${JSON.stringify(
          camefrom
        )}`,
        scopes: "public_repo",
      },
    });
  };

  return (
    <Button
      onClick={() => handleGithubSignUp()}
      variant={"secondary"}
      className="gap-2.5"
      size={"full"}
    >
      <Image src={githubLogo} alt="Github logo" width="20" height="19.59" />
      <span className="text-[#24292f] text-sm font-bold ">Github</span>
    </Button>
  );
}

export default GithubSignIn;

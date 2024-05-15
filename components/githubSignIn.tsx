"use client";
import { Button } from "./ui/button";
import Image from "next/image";
import githubLogo from "@/app/_assets/githubLogo.svg";
import { createClient } from "@/lib/supabase/client";
import { cookies } from "next/headers";

function GithubSignIn({ signUp }: { signUp: boolean }) {
  const supabase = createClient();

  let multiStepFormData: { [key: string]: string | boolean };
  if (signUp) {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser) {
      multiStepFormData = {
        cameFrom: sessionStorage.getItem("selectedSource")
          ? JSON.parse(sessionStorage.getItem("selectedSource") as string)
          : "Other",
        linkedGithub: sessionStorage.getItem("LinkGithub")
          ? JSON.parse(sessionStorage.getItem("LinkGithub") as string)
          : false,
        enabled_notifications: sessionStorage.getItem("activatedNotifications")
          ? JSON.parse(
              sessionStorage.getItem("activatedNotifications") as string
            )
          : false,
        goal: sessionStorage.getItem("dailyGoal")
          ? String(
              Number(
                JSON.parse(
                  sessionStorage.getItem("dailyGoal") as string
                ).substring(0, 2)
              )
            )
          : "10",
      };
    }
  }

  const handleGithubSignUp = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `http://localhost:3000/api/auth?next=${"/dashboard"}&&signUp=${signUp}&&multiStepFormData=${JSON.stringify(
          multiStepFormData
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

"use client";
import SignUpForm from "./signUpForm";
import GithubSignUp from "./githubSignUp";

function SignUp() {
  if (typeof window !== "object") {
    return null;
  }
  const linkGithub = sessionStorage.getItem("LinkGithub") ?? "false";

  return <>{JSON.parse(linkGithub) ? <GithubSignUp /> : <SignUpForm />}</>;
}

export default SignUp;

"use client";
import SignUpForm from "./signUpForm";
import GithubSignIn from "./githubSignIn";

function SignUp() {
  if (typeof window !== "object") {
    return null;
  }
  const linkGithub = sessionStorage.getItem("LinkGithub") ?? "false";

  return <>{JSON.parse(linkGithub) ? <GithubSignIn /> : <SignUpForm />}</>;
}

export default SignUp;

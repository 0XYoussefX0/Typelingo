import ProgressBar from "@/components/ui/progressBar";
import Link from "next/link";

import Image from "next/image";
import backIcon from "@/app/_assets/backIcon.svg";
import Step1 from "@/components/step1";

function Page() {
  const steps = [<Step1 key="0" />];
  return (
    <>
      <div className="flex gap-4 justify-center items-center w-screen pt-11">
        <Link href={`/`} aria-label="go back to the previous page">
          <Image src={backIcon} alt="" />
        </Link>
        <ProgressBar />
      </div>
      <main className="mt-[163px]">{steps[0]}</main>
    </>
  );
}

export default Page;

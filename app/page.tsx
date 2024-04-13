import Image from "next/image";
import logo from "@/app/_assets/logo.svg";
import planet_icon from "@/app/_assets/planet_icon.svg";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="bg-dark-blue h-screen w-screen flex flex-col">
      <nav className="flex justify-center items-center p-4">
        <Image src={logo} alt="typelingo's logo" />
      </nav>
      <main className="flex-1 bg-[url('@/app/_assets/starsBg.png')] flex items-center justify-center gap-[140px]">
        <div>
          <Image src={planet_icon} alt="" />
        </div>
        <div className="flex items-center flex-col gap-12">
          <h1 className="text-white font-bold text-center text-[32px] ">
            The free, fun, and effective way to
            <br />
            Become a Typescript Wizard
          </h1>
          <div className="flex flex-col gap-3">
            <Button href="/getting-started?Step=DiscoveryStep">
              GET STARTED
            </Button>
            <Button variant={"tertiary"} href="/login">
              I ALREADY HAVE AN ACCOUNT
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

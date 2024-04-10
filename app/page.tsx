import Image from "next/image";
import logo from "@/app/_assets/logo.svg";

import { Button } from "@/components/button";

export default function Home() {
  return (
    <div className="bg-dark-blue h-screen w-screen flex flex-col">
      <nav className="flex justify-center items-center p-4">
        <Image src={logo} alt="typelingo's logo" />
      </nav>
      <main className="flex-1 bg-[url('@/app/_assets/starsBg.png')]">
        <Button>Get Started</Button>
      </main>
    </div>
  );
}

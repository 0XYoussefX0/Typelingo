"use client";

import { useRef, useState, useEffect } from "react";

import ProgressBar from "@/components/ui/progressBar";
import { Button } from "@/components/ui/button";

import Image from "next/image";

import Editor, { Monaco } from "@monaco-editor/react";
import { useRouter } from "next/navigation";

import { editor } from "monaco-editor";

import closeIcon from "@/app/_assets/closeIcon.svg";
import checkmarkIcon from "@/app/_assets/checkmarkIcon.svg";
import XIcon from "@/app/_assets/Xicon.svg";
import codeIcon from "@/app/_assets/codeIcon.svg";
import videoIcon from "@/app/_assets/videoIcon.svg";

import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

function Page() {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const workerRef = useRef<Worker>();

  const [challengeStatus, setChallengeStatus] = useState<
    "passed" | "failed" | "pending" | undefined
  >(undefined);

  const [codeModal, setCodeModal] = useState(false);
  const [videoModal, setVideoModal] = useState(false);

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

  const typesForTesting = `
  type Expect<T extends true> = T;
  type ExpectTrue<T extends true> = T;
  type ExpectFalse<T extends false> = T;
  type IsTrue<T extends true> = T;
  type IsFalse<T extends false> = T;
 
  type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
   T,
 >() => T extends Y ? 1 : 2
   ? true
   : false;
  type NotEqual<X, Y> = true extends Equal<X, Y> ? false : true;
 
 // https://stackoverflow.com/questions/49927523/disallow-call-with-any/49928360#49928360
  type IsAny<T> = 0 extends 1 & T ? true : false;
  type NotAny<T> = true extends IsAny<T> ? false : true;
 
  type Debug<T> = { [K in keyof T]: T[K] };
  type MergeInsertions<T> = T extends object
   ? { [K in keyof T]: MergeInsertions<T[K]> }
   : T;
 
  type Alike<X, Y> = Equal<MergeInsertions<X>, MergeInsertions<Y>>;
 
  type ExpectExtends<VALUE, EXPECTED> = EXPECTED extends VALUE
   ? true
   : false;
  type ExpectValidArgs<
   FUNC extends (...args: any[]) => any,
   ARGS extends any[],
 > = ARGS extends Parameters<FUNC> ? true : false;
 
  type UnionToIntersection<U> = (
   U extends any ? (k: U) => void : never
 ) extends (k: infer I) => void
   ? I
   : never;
 
  const doNotExecute = (func: () => any) => {};`;

  function handleEditorWillMount(monaco: Monaco) {
    // here is the monaco instance
    // do something before editor is mounted
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      typesForTesting,
      "file:///node_modules/@types/my-lib/index.d.ts"
    );
  }

  const handleEditorDidMount = (
    editor: editor.IStandaloneCodeEditor,
    monaco: Monaco
  ) => {
    editorRef.current = editor;
  };

  const router = useRouter();
  const currentLevel = 1; /* change the value of this variable with the current page param */

  const skip = () => {
    // update the completed column in the database
    router.push(`/dashboard/${currentLevel + 1}`);
  };

  const check = async () => {
    setChallengeStatus("pending");
    if (editorRef.current === undefined) return;
    const userCode = editorRef.current.getValue();

    const finalCode = typesForTesting + userCode;

    fetch("/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: finalCode,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.solution === "correct") {
          console.log("correct");
          setChallengeStatus("passed");
        } else {
          console.log("incorrect");
          setChallengeStatus("failed");
        }
      });
  };

  const nextChallenge = () => {
    // update the completed column of this challenge in the database
    router.push(`/dashboard/${currentLevel + 1}`);
  };

  const showCodeModel = () => {
    setCodeModal(true);
  };

  const showVideoModel = () => {
    setVideoModal(true);
  };

  return (
    <>
      <div className="flex flex-col w-full h-screen">
        <div className="flex gap-4 justify-center items-center w-screen pt-11">
          <Button variant="noStyling" size="fit" href="/dashboard">
            <Image src={closeIcon} alt="" />
          </Button>
          <ProgressBar progressBarColor={"bg-[#58CC02]"} currentStepIndex={0} />
        </div>
        <main className="flex-1 flex flex-col gap-20 items-center justify-between mt-10">
          <div className="flex-1 flex flex-col items-center justify-center gap-10">
            <div className="flex flex-col gap-5 items-center">
              <h1 className="text-center font-bold text-[28px] text-dark-grey">
                SLICE
              </h1>
              <p className="font-medium text-[#3C3C3C] text-center mx-[300px]">
                {
                  "Implement the JavaScript Array.slice function in the type system. Slice<Arr, Start, End> takes the three argument. The output should be a subarray of Arr from index Start to End. Indexes with negative numbers should be counted from reversely."
                }
              </p>
            </div>
            <div className="rounded-2xl border-2 border-solid border-light-grey w-[80%] h-fit">
              <Editor
                height="40vh"
                defaultLanguage="typescript"
                defaultValue={value}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
              />
            </div>
          </div>
          {challengeStatus === undefined || challengeStatus === "pending" ? (
            <div className="h-[140px] border-t-2 border-light-grey border-solid flex justify-between w-full items-center px-[10%]">
              <Button
                variant={"secondary"}
                className="w-[149px]"
                onClick={() => skip()}
              >
                SKIP
              </Button>
              <Button
                className="w-[159px]"
                onClick={() => check()}
                disabled={challengeStatus === "pending"}
              >
                {challengeStatus === "pending" ? "LOADING ..." : "CHECK"}
              </Button>
            </div>
          ) : challengeStatus === "passed" ? (
            <div className="bg-[#D7FFB8] h-[140px] border-t-2 border-light-grey border-solid flex justify-between w-full items-center px-[10%]">
              <div className="flex gap-4 items-center">
                <div className="bg-white rounded-full flex items-center justify-center w-[80px] h-[80px]">
                  <Image src={checkmarkIcon} alt="" />
                </div>
                <span className="text-[#489D26] font-medium text-2xl">
                  Good Job!!
                </span>
              </div>
              <Button className="w-[151px]" onClick={() => nextChallenge()}>
                CONTINUE
              </Button>
            </div>
          ) : (
            <div className="bg-[#FFDADC] h-[140px] border-t-2 border-light-grey border-solid flex justify-between w-full items-center px-[10%]">
              <div className="flex gap-4 items-center">
                <div className="bg-white rounded-full flex items-center justify-center w-[80px] h-[80px]">
                  <Image src={XIcon} alt="" />
                </div>
                <div className="flex flex-col gap-4">
                  <span className="text-[#EE282D] font-medium text-2xl">
                    Correct solution:
                  </span>
                  <div className="flex gap-3">
                    <Dialog>
                      <DialogTrigger className="flex gap-1.5 items-center bg-transparent border-transparent p-0 border-none cursor-pointer">
                        <Image src={codeIcon} alt="" />
                        <span className="font-medium text-[#F35D61]">
                          VIEW CODE SOLUTION
                        </span>
                      </DialogTrigger>
                      <DialogPortal>
                        <DialogOverlay />
                        <DialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                          TOZTOTOTO
                        </DialogContent>
                      </DialogPortal>
                    </Dialog>

                    <Dialog>
                      <DialogTrigger className="flex gap-1.5 items-center bg-transparent border-transparent p-0 border-none">
                        <Image src={videoIcon} alt="" />
                        <span className="font-medium text-[#F35D61]">
                          VIEW VIDEO SOLUTION
                        </span>
                      </DialogTrigger>
                      <DialogPortal>
                        <DialogOverlay />
                        <DialogContent className="fixed left-[50%] top-[50%] z-50 flex flex-col bg-[#fff] w-[90%] translate-x-[-50%] translate-y-[-50%] gap-4 border p-6 pt-2 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
                          <DialogClose className=" flex justify-end relative  h-5 ">
                            <Image
                              src={closeIcon}
                              alt=""
                              className="absolute top-1 -right-3"
                            />
                          </DialogClose>
                          <div className="relative w-full pb-[56.25%]">
                            <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center">
                              <iframe
                                width="100%"
                                height="100%"
                                src="https://www.youtube.com/embed/_sJytCRSETQ?si=gzgBiURHs0qeta55"
                                title="YouTube video player"
                                frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerpolicy="strict-origin-when-cross-origin"
                                allowfullscreen
                              ></iframe>
                              <div className="flex justify-center absolute -bottom-5">
                                <a
                                  href="https://www.youtube.com/embed/_sJytCRSETQ?si=gzgBiURHs0qeta55"
                                  className="videoLink relative text-xs font-medium text-dark-blue-sky border-b-blue-sky border-b border-dashed"
                                >
                                  Readonly with Rob Meyer - Typescript Type
                                  Challenges #7 [EASY]{" "}
                                </a>
                                <span className="text-dark-grey text-xs font-medium ml-1">
                                  {" "}
                                  © Michigan TypeScript
                                </span>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </DialogPortal>
                    </Dialog>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <Button
                  className="w-[151px] bg-[#FF4347] border-[#FF4347] border-b-[#EE282D]"
                  onClick={() => nextChallenge()}
                >
                  RETRY
                </Button>
                <Button variant="secondary" className="w-[151px] bg-[#fff]">
                  SKIP
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

export default Page;

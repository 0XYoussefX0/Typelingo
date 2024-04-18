"use client";
import { useState, useRef } from "react";

import { Editor, Monaco } from "@monaco-editor/react";

import { editor } from "monaco-editor";
import { challengeStatusStore } from "./challengeBanner";

type ChallengeProps = {
  challengeCode: string;
  challengeTitle: string;
  challengeDescription: string;
};

function Challenge({
  challengeCode,
  challengeTitle,
  challengeDescription,
}: ChallengeProps) {
  const editorRef = useRef<editor.IStandaloneCodeEditor>();

  const challengeStatus = challengeStatusStore(
    (state) => state.challengeStatus
  );

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

  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      typesForTesting,
      "file:///node_modules/@types/my-lib/index.d.ts"
    );
  }

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
  };
  return (
    <main
      className={`flex flex-col gap-20 items-center justify-between mt-10 flex-1 ${
        challengeStatus === "exit" ? "challenge-out" : "challenge-in"
      }`}
    >
      <div className="flex-1 flex flex-col items-center justify-center gap-10">
        <div className="flex flex-col gap-5 items-center">
          <h1 className="text-center font-bold text-[28px] text-dark-grey">
            {challengeTitle}
          </h1>
          <p className="font-medium text-[#3C3C3C] text-center mx-[300px]">
            {challengeDescription}
          </p>
        </div>
        <div className="rounded-2xl border-2 border-solid border-light-grey w-[80%] h-fit">
          <Editor
            height="40vh" // modify the height depending on the viewport or make it the remaining height in the screen and add some margins between other elements
            defaultLanguage="typescript"
            defaultValue={challengeCode}
            beforeMount={handleEditorWillMount}
            onMount={handleEditorDidMount}
          />
        </div>
      </div>
    </main>
  );
}

export default Challenge;

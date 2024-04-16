"use client";

import { useRef } from "react";

import ProgressBar from "@/components/ui/progressBar";
import { Button } from "@/components/ui/button";

import closeIcon from "@/app/_assets/closeIcon.svg";
import Image from "next/image";

import Editor, { Monaco } from "@monaco-editor/react";
import { useRouter } from "next/navigation";

import { createProject, ts } from "@ts-morph/bootstrap";

import * as monaco from "monaco-editor";

import { unstable_noStore } from "next/cache";

function Page() {
  unstable_noStore();

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>();

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
    editor: monaco.editor.IStandaloneCodeEditor,
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
    const project = await createProject({ useInMemoryFileSystem: true });

    if (editorRef.current === undefined) return;

    const userCode = editorRef.current.getValue();

    const finalCode = typesForTesting + userCode;
    console.log(finalCode);

    project.fileSystem.writeFileSync("MyClass.ts", finalCode);

    const program = project.createProgram({
      rootNames: ["MyClass.ts"],
      options: {},
    });

    const diagnostics = program.getSemanticDiagnostics();
  };

  return (
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
        <div className="h-[140px] border-t-2 border-light-grey border-solid flex justify-between w-full items-center px-[10%]">
          <Button
            variant={"secondary"}
            className="w-[149px]"
            onClick={() => skip()}
          >
            SKIP
          </Button>
          <Button className="w-[159px]" onClick={() => check()}>
            CHECK
          </Button>
        </div>
      </main>
    </div>
  );
}

export default Page;

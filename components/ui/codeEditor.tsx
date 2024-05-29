"use client";

import { Editor, Monaco } from "@monaco-editor/react";

import { typesForTesting } from "@/lib/types";

import { create } from "zustand";

import { challengeStatusStore } from "../challengeBanner";
import { useEffect, useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";

type EditorRefStore = {
  editorValue: string | undefined;
  setEditorValue: (editor: string | undefined) => void;
};
export const editorRefStore = create<EditorRefStore>((set) => ({
  editorValue: "",
  setEditorValue: (value) => set({ editorValue: value }),
}));

type CodeEditorProps = {
  challengeCode: string;
};

function CodeEditor({ challengeCode }: CodeEditorProps) {
  const challengeStatus = challengeStatusStore(
    (state) => state.challengeStatus
  );
  const setChallengeStatus = challengeStatusStore(
    (state) => state.setChallengeStatus
  );

  const [mobileUser, setMobileUser] = useState(false);

  const setEditorValue = editorRefStore((state) => state.setEditorValue);
  const editorValue = editorRefStore((state) => state.editorValue);

  useEffect(() => {
    setEditorValue(challengeCode);
  }, [challengeCode]);

  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      typesForTesting,
      "file:///node_modules/@types/my-lib/index.d.ts"
    );
  }

  const handleEditorChange = (val: string | undefined) => {
    if (challengeStatus === "failed") {
      setChallengeStatus(undefined);
    }
    console.log(val);
    setEditorValue(val);
  };

  return (
    <div
      className="rounded-2xl border-2 border-solid border-light-grey w-[80%] h-fit mb-20"
      {...(!mobileUser && {
        onTouchStart: () => {
          window.alert(
            "We've detected that you're using a mobile device. To ensure compatibility, we'll switch to a mobile-friendly code editor. Please note that this version of the editor does not support features like IntelliSense and validation."
          );
          setMobileUser(true);
        },
      })}
    >
      {mobileUser ? (
        <CodeMirror
          height="50vh"
          value={editorValue}
          extensions={[javascript({ typescript: true })]}
          onChange={handleEditorChange}
          width="80vw"
        />
      ) : (
        <Editor
          onChange={handleEditorChange}
          height="50vh"
          defaultLanguage="typescript"
          value={editorValue}
          beforeMount={handleEditorWillMount}
        />
      )}
    </div>
  );
}

export default CodeEditor;

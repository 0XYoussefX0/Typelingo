"use client";

import { Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

import { typesForTesting } from "@/lib/types";

import { create } from "zustand";

import { challengeStatusStore } from "../challengeBanner";
import { useState } from "react";

import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { ReactCodeMirrorRef } from "@uiw/react-codemirror";

type EditorRefStore = {
  editorRef: editor.IStandaloneCodeEditor | ReactCodeMirrorRef | null;
  setEditorRef: (
    editor: editor.IStandaloneCodeEditor | ReactCodeMirrorRef | null
  ) => void;
};
export const editorRefStore = create<EditorRefStore>((set) => ({
  editorRef: null,
  setEditorRef: (editor) => set({ editorRef: editor }),
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

  const setEditorRef = editorRefStore((state) => state.setEditorRef);

  function handleEditorWillMount(monaco: Monaco) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(
      typesForTesting,
      "file:///node_modules/@types/my-lib/index.d.ts"
    );
  }

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor) => {
    setEditorRef(editor);
  };

  const handleEditorChange = () => {
    if (challengeStatus === "failed") {
      setChallengeStatus(undefined);
    }
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
          ref={(editor) => setEditorRef(editor)}
          height="50vh"
          value={challengeCode}
          extensions={[javascript({ typescript: true })]}
          onChange={handleEditorChange}
          width="80vw"
        />
      ) : (
        <Editor
          onChange={handleEditorChange}
          height="50vh"
          defaultLanguage="typescript"
          value={challengeCode}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
        />
      )}
    </div>
  );
}

export default CodeEditor;

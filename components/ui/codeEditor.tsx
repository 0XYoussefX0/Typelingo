"use client";

import { Editor, Monaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

import { typesForTesting } from "@/lib/types";

import { create } from "zustand";

import { challengeStatusStore } from "../challengeBanner";

type EditorRefStore = {
  editorRef: editor.IStandaloneCodeEditor | null;
  setEditorRef: (editor: editor.IStandaloneCodeEditor) => void;
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
    <Editor
      onChange={handleEditorChange}
      height="40vh"
      defaultLanguage="typescript"
      defaultValue={challengeCode}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
}

export default CodeEditor;

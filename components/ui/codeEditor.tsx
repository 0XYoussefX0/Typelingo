import React from "react";

function CodeEdtior() {
  // implement some
  return (
    <Editor
      height="40vh"
      defaultLanguage="typescript"
      defaultValue={value}
      beforeMount={handleEditorWillMount}
      onMount={handleEditorDidMount}
    />
  );
}

export default CodeEdtior;

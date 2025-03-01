import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector";
import { CODE_SNIPPETS } from "../constants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    setLanguage(language);
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <div className="flex lg:flex-col md:flex-row gap-4 pl-4 pr-2">
      {/* Code Editor Section */}
      <div className="w-[1000px]">
        <LanguageSelector language={language} onSelect={onSelect} />
        <div className="border border-gray-700 rounded-lg overflow-hidden">
          <Editor
            options={{
              minimap: { enabled: false },
            }}
            height="62vh"
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
      </div>

      {/* Output Section */}
      <div className="w-full md:w-1/2">
        <Output editorRef={editorRef} language={language} />
      </div>
    </div>
  );
};

export default CodeEditor;

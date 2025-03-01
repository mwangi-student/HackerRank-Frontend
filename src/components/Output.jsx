import { useState } from "react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
  }

  return (
    <div className="w-[full]">
      <h3 className="mb-2 text-lg font-semibold text-white">Output</h3>
      <button
        className="mb-4 px-4 py-2 border border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition disabled:opacity-50"
        disabled={isLoading}
        onClick={runCode}
      >
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <button
        className="ml-6 mb-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 hover:text-white transition disabled:opacity-50"
        disabled={isSubmitting}
        onClick={handleSubmit}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
      <div
        className={`min-h-[150px] w-[850px] p-2 border rounded-md ${isError ? "border-red-500 text-red-400" : "border-gray-700 text-white"}`}
      >
        {output ? output.map((line, i) => <p key={i}>{line}</p>) : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;


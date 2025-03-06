import { useState } from "react";
import { executeCode } from "../api";
import { useNavigate } from "react-router-dom";

const output_1 = "Antony";
const output_2 = "David";
const output_3 = "Brian"

const Output = ({ editorRef, language }) => {
  const navigate = useNavigate()
  const [output, setOutput] = useState([]);
  const [expectedOutput, setExpectedOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const getAnswer = () => {
    setExpectedOutput(output_1, output_2, output_3)
  }
  const runCode = async () => {
    getAnswer();
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);

      // Split output into array of lines and trim spaces
      const outputLines = result.output.split("\n").map((line) => line.trim());
      setOutput(outputLines);
      setIsError(!!result.stderr);

      // Compare each line of output with expected
      const allCorrect =
        outputLines.length === expectedOutput.length &&
        outputLines.every((line, index) => line === expectedOutput[index]);

      setIsCorrect(allCorrect);
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to run code");
    } finally {
      setIsLoading(false);
    }
  };

  const submitCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      await fetch("http://localhost:5000/store_output", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question_id: questionId, output: result.output }),
      });
    } catch (error) {
      console.error(error);
      alert(error.message || "Unable to run code");
    } finally {
      setIsSubmitting(false);
      navigate("/prepare")
    }

  }

  const handleSubmit = () => {
    setIsSubmitting(true);
    submitCode();
  };

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
        className={`min-h-[150px] w-[850px] p-2 border rounded-md text-white mt-4 ${
          isError
            ? "border-red-500 text-red-400"
            : isCorrect === null
            ? "border-gray-700"
            : isCorrect
            ? "border-green-500 text-green-400"
            : "border-red-500 text-red-400"
        }`}
      >
        {output
          ? output.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};

export default Output;

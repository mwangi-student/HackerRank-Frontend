import React, { useState, useEffect } from "react";

export default function CreateAssessmentForm({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isUpdateMode,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    difficulty: "",
    category: "",
    publish: false,
    inviteStudents: false,
    assessmentType: "",
    numberOfQuestions: 1,
    currentQuestionIndex: 0, // Tracks which question is being created
    questions: [],
    codeChallenge: {
      task: "",
      example: "",
      inputFormat: "",
      outputFormat: "",
      constraints: "",
      sampleInput: "",
      sampleOutput: "",
    },
  });

  const [currentMCQ, setCurrentMCQ] = useState({
    question: "",
    choices: { a: "", b: "", c: "", d: "" },
    correctAnswer: "",
  });

  useEffect(() => {
    if (isUpdateMode && initialData) {
      setFormData(initialData);
    }
  }, [isUpdateMode, initialData]);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleMCQChange = (e) => {
    const { name, value } = e.target;
    setCurrentMCQ((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleMCQChoicesChange = (e) => {
    const { name, value } = e.target;
    setCurrentMCQ((prev) => ({
      ...prev,
      choices: { ...prev.choices, [name]: value },
    }));
  };

  const handleCodeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      codeChallenge: { ...prev.codeChallenge, [name]: value },
    }));
  };

  const handleAddQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questions: [...prev.questions, currentMCQ],
      currentQuestionIndex: prev.currentQuestionIndex + 1,
    }));

    // Reset the MCQ fields for the next question
    setCurrentMCQ({
      question: "",
      choices: { a: "", b: "", c: "", d: "" },
      correctAnswer: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.assessmentType === "mcq") {
      setFormData((prev) => ({
        ...prev,
        questions: [...prev.questions, currentMCQ], // Add last question
      }));
    }
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg max-h-[90vh] overflow-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {isUpdateMode ? "Update Assessment" : "Create Assessment"}
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          ></textarea>

          <input
            type="text"
            name="difficulty"
            placeholder="Difficulty (e.g., Easy, Medium, Hard)"
            value={formData.difficulty}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category (e.g., JavaScript, Python)"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded-lg w-full"
            required
          />

          {/* Assessment Type Dropdown */}
          <div>
            <label
              htmlFor="assessmentType"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Type of Assessment
            </label>
            <select
              id="assessmentType"
              name="assessmentType"
              value={formData.assessmentType}
              onChange={handleChange}
              className="block w-full p-2 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>
                Choose type of assessment
              </option>
              <option value="mcq">Multiple Choice Question</option>
              <option value="code">Code Challenge Question</option>
            </select>
          </div>

          {/* Dynamic Fields Based on Selection */}
          {formData.assessmentType === "mcq" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <label className="block text-sm font-medium">
                Number of Questions
              </label>
              <input
                type="number"
                min="1"
                name="numberOfQuestions"
                value={formData.numberOfQuestions}
                onChange={handleChange}
                className="border p-2 rounded-lg w-full"
              />

              <h3 className="text-lg font-semibold mt-4">
                Question {formData.currentQuestionIndex + 1} /{" "}
                {formData.numberOfQuestions}
              </h3>

              <textarea
                name="question"
                placeholder="Enter the question"
                value={currentMCQ.question}
                onChange={handleMCQChange}
                className="border p-2 rounded-lg w-full"
                required
              ></textarea>

              {["a", "b", "c", "d"].map((choice) => (
                <input
                  key={choice}
                  type="text"
                  name={choice}
                  placeholder={`Choice ${choice.toUpperCase()}`}
                  value={currentMCQ.choices[choice]}
                  onChange={handleMCQChoicesChange}
                  className="border p-2 rounded-lg w-full mt-1"
                  required
                />
              ))}

              <label className="block mt-3">Correct Answer</label>
              <select
                name="correctAnswer"
                value={currentMCQ.correctAnswer}
                onChange={handleMCQChange}
                className="block w-full p-2 border rounded-lg"
                required
              >
                <option value="" disabled>
                  Select correct answer
                </option>
                {["a", "b", "c", "d"].map((choice) => (
                  <option key={choice} value={choice}>
                    {choice.toUpperCase()}
                  </option>
                ))}
              </select>

              {formData.currentQuestionIndex + 1 <
              formData.numberOfQuestions ? (
                <button
                  type="button"
                  onClick={handleAddQuestion}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Add Question
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Submit
                </button>
              )}
            </div>
          )}

          {formData.assessmentType === "code" && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Coding Challenge</h3>
              <textarea
                name="task"
                placeholder="Task Description"
                value={formData.codeChallenge.task}
                onChange={handleCodeChange}
                className="border p-2 rounded-lg w-full"
                required
              ></textarea>
              <textarea
                name="example"
                placeholder="Example"
                value={formData.codeChallenge.example}
                onChange={handleCodeChange}
                className="border p-2 rounded-lg w-full"
                required
              ></textarea>
              <input
                type="text"
                name="inputFormat"
                placeholder="Input Format"
                value={formData.codeChallenge.inputFormat}
                onChange={handleCodeChange}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                name="outputFormat"
                placeholder="Output Format"
                value={formData.codeChallenge.outputFormat}
                onChange={handleCodeChange}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                name="constraints"
                placeholder="Constraints (Optional)"
                value={formData.codeChallenge.constraints}
                onChange={handleCodeChange}
                className="border p-2 rounded-lg w-full"
              />
              <input
                type="text"
                name="sampleInput"
                placeholder="Sample Input"
                value={formData.codeChallenge.sampleInput}
                onChange={handleCodeChange}
                className="border p-2 rounded-lg w-full"
                required
              />
              <input
                type="text"
                name="sampleOutput"
                placeholder="Sample Output"
                value={formData.codeChallenge.sampleOutput}
                onChange={handleCodeChange}
                className="border p-2 rounded-lg w-full"
                required
              />
            </div>
          )}

          {/* Buttons */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              {isUpdateMode ? "Update" : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

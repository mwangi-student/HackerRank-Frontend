import React, { useState } from "react";
import { AssessmentHeader } from "../../components";

const mcqQuestions = [
  {
    question: "What is the capital of France?",
    choices: { A: "Berlin", B: "Madrid", C: "Paris", D: "Rome" },
    correctAnswer: "C",
  },
  {
    question: "Which planet is known as the Red Planet?",
    choices: { A: "Earth", B: "Mars", C: "Jupiter", D: "Venus" },
    correctAnswer: "B",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    choices: {
      A: "Harper Lee",
      B: "Mark Twain",
      C: "Ernest Hemingway",
      D: "Jane Austen",
    },
    correctAnswer: "A",
  },
  {
    question: "What is the largest ocean on Earth?",
    choices: {
      A: "Atlantic Ocean",
      B: "Indian Ocean",
      C: "Arctic Ocean",
      D: "Pacific Ocean",
    },
    correctAnswer: "D",
  },
  {
    question: "What is the square root of 64?",
    choices: { A: "6", B: "7", C: "8", D: "9" },
    correctAnswer: "C",
  },
];

export default function MCQQuiz() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (questionIndex, choice) => {
    setAnswers((prev) => ({ ...prev, [questionIndex]: choice }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <div className="fixed top-0 w-full z-[100]">
        <AssessmentHeader />
      </div>
      <div className="font-[Montserrat] p-8 max-w-2xl mx-auto bg-gray-50 shadow-lg rounded-lg border border-gray-200 mt-14">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          📝 MCQ Quiz
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {mcqQuestions.map((q, index) => (
            <div
              key={index}
              className="p-5 bg-white border border-gray-300 rounded-lg shadow-md"
            >
              <p className="font-semibold text-lg mb-3">
                {index + 1}. {q.question}
              </p>
              <div className="mt-2 space-y-2">
                {Object.entries(q.choices).map(([key, choice]) => (
                  <label
                    key={key}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer transition ${
                      answers[index] === key
                        ? "bg-blue-100 border border-blue-500"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={key}
                      checked={answers[index] === key}
                      onChange={() => handleSelect(index, key)}
                      className="form-radio text-blue-600 hidden"
                    />
                    <div
                      className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                        answers[index] === key
                          ? "bg-blue-500 text-white border-blue-500"
                          : "border-gray-400"
                      }`}
                    >
                      {answers[index] === key && "✔"}
                    </div>
                    <span className="text-gray-800">{choice}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="mt-6 w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Submit Quiz
          </button>
        </form>
        {submitted && (
          <div className="mt-6 p-5 bg-green-100 text-green-900 rounded-lg text-center shadow-md">
            ✅ <strong>Quiz submitted successfully!</strong> Thank you for
            participating.
          </div>
        )}
      </div>
    </div>
  );
}

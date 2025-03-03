import React from "react";

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

// Example: User's selected answers (Modify this for testing)
const userAnswers = ["B", "B", "A", "B", "C"];

export default function QuizResults() {
  const totalQuestions = mcqQuestions.length;
  const correctCount = mcqQuestions.reduce(
    (acc, q, index) => (userAnswers[index] === q.correctAnswer ? acc + 1 : acc),
    0
  );
  const scorePercentage = ((correctCount / totalQuestions) * 100).toFixed(2);

  return (
    <div>
      <div className="fixed top-0 w-full z-[100]">
        <AssessmentHeader />
      </div>
      <div className="font-[Montserrat] w-[full mx-auto p-6 px-40 bg-[#F3F5FF] shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          📊 Quiz Results
        </h2>

        {/* Left Sidebar for Score */}
        <div className="flex">
          <div className="w-1/3 bg-white p-5 rounded-lg shadow-md border border-gray-300">
            <h3 className="text-xl font-semibold text-gray-800">Your Score</h3>
            <div></div>
            <p className="text-4xl font-bold text-blue-600 mt-2">
              {correctCount} out of {totalQuestions}
            </p>
            <p className="text-lg text-gray-700 mt-1">{scorePercentage}%</p>
          </div>

          {/* Right Section - Answer Review */}
          <div className="w-2/3 pl-6">
            {mcqQuestions.map((q, index) => {
              const isCorrect = userAnswers[index] === q.correctAnswer;
              return (
                <div
                  key={index}
                  className="p-4 mb-4 bg-white border rounded-lg shadow-md"
                >
                  <p className="font-semibold text-lg">
                    {index + 1}. {q.question}
                  </p>
                  <div className="mt-2">
                    {Object.entries(q.choices).map(([key, choice]) => (
                      <p
                        key={key}
                        className={`p-2 rounded-lg ${
                          userAnswers[index] === key
                            ? isCorrect
                              ? "bg-green-100 text-green-800 font-bold"
                              : "bg-red-100 text-red-800 font-bold"
                            : "text-gray-700"
                        }`}
                      >
                        {key}: {choice} {q.correctAnswer === key && ""}
                      </p>
                    ))}
                  </div>
                  {!isCorrect && (
                    <p className="mt-2 text-red-600 font-semibold">
                      Correct Answer: {q.correctAnswer} -{" "}
                      {q.choices[q.correctAnswer]}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

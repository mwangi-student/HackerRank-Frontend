import React from "react";
import { CreateFeedback, TmNavbar} from "../../components";

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

export default function McqGradeSubmission() {
  const totalQuestions = mcqQuestions.length;
  const correctCount = mcqQuestions.reduce(
    (acc, q, index) => (userAnswers[index] === q.correctAnswer ? acc + 1 : acc),
    0
  );
  const scorePercentage = ((correctCount / totalQuestions) * 100).toFixed(2);

  // Determine Grade
  let grade;
  if (scorePercentage >= 70) grade = "A";
  else if (scorePercentage >= 60) grade = "B";
  else if (scorePercentage >= 50) grade = "C";
  else if (scorePercentage >= 40) grade = "D";
  else grade = "E";

  return (
    <div className="bg-[#ededed] font-[Montserrat] flex flex-col min-h-screen w-full">
      <div className="fixed top-0 w-full z-[100]">
        <TmNavbar />
      </div>
      <div className="flex flex-row gap-5 py-[5%] pl-[10%] pr-[17%]">
              <div className="w-[900px] p-6">
              <h2 className="text-3xl text-bold text-[#014C06]">Assessment Submission</h2>
          <hr className="w-32 border-gray-400 border-2 my-2" />
          <p className="font-medium text-lg text-[#014C06]">
            Check students solution for the assessment.
          </p>
          {mcqQuestions.map((q, index) => {
            const isCorrect = userAnswers[index] === q.correctAnswer;
            return (
              <div
                key={index}
                className="p-4 mb-4 border rounded-lg shadow-md w-[500px]"
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
                      {key}: {choice}
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
        <div>
        <h2 className="text-3xl text-bold text-[#014C06] mb-4">
            Overall Score & Grade
          </h2>
          <div className="min-w-[300px] h-[250px] rounded-lg shadow-md flex flex-col justify-center items-center p-6">
            <div className="flex flex-row gap-2 mb-4">
              <span className="text-2xl font-medium mt-2">
                Correct Questions:
              </span>
              <p className="text-2xl font-bold mt-2">
                {correctCount} out of {totalQuestions}
              </p>
            </div>
            <div className="flex flex-row gap-2 mb-4">
              <span className="text-2xl font-medium mt-2">Percentage: </span>
              <p className="text-2xl font-bold mt-2">{scorePercentage}%</p>
            </div>
            <div className="flex flex-row gap-2">
              <span className="text-2xl font-medium mt-2">Grade: </span>
              <p className="text-2xl font-bold mt-2">{grade}</p>
            </div>
          </div>
          <div className="min-w-[300px] h-[250px] rounded-lg shadow-md flex flex-col justify-center items-center p-6"><CreateFeedback /></div>
        </div>
      </div>
    </div>
  );
}

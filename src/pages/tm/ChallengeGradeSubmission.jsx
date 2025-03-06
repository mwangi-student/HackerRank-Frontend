import React from "react";
import { CreateFeedback } from "../../components";

// Example: User's selected answers (Modify this for testing)
const userAnswers = ["Brian", "Britney", "Antony", "Charles"];

// Expected outputs
const expectedOutputs = ["Brian", "Vivian", "Antony", "Charles"];

export default function ChallengeGradeSubmission() {
  const totalQuestions = expectedOutputs.length;

  // Calculate correct answers
  const correctCount = userAnswers.reduce(
    (acc, answer, index) => (answer === expectedOutputs[index] ? acc + 1 : acc),
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
      <div className="flex flex-row gap-5 py-[5%] pl-[10%] pr-[17%]">
        <div className="w-[900px] p-6">
          <h2 className="text-3xl font-bold text-[#014C06]">
            Assessment Submission
          </h2>
          <hr className="w-32 border-gray-400 border-2 my-2" />
          <p className="font-medium text-lg text-[#014C06]">
            Check students' solutions for the assessment.
          </p>
          <div className="mt-4 font-[Satoshi] w-full min-h-[500px] bg-[#e4e4e7] p-6 rounded-lg">
            <h5 className="font-bold text-2xl mb-4">The Hashtag Generator</h5>
            <h5 className="font-bold text-lg mb-4">Task</h5>
            <p className="text-base leading-[1.8] mb-8">
              You are given a string s that consists of English letters and
              brackets. Your task is to reverse the strings in each pair of
              matching brackets, starting from the innermost one step by step
              (remove the brackets at the same time).
            </p>

            {/* Dynamic Rendering of Student Answers */}
            <div className="mt-4 flex flex-col">
              <h5 className="font-bold text-2xl mb-4">Student's Solution</h5>

              {userAnswers.map((answer, index) => {
                const isCorrect = answer === expectedOutputs[index];

                return (
                  <div className="flex flex-row mb-4 gap-6" key={index}>
                    <div>
                      <h5 className="font-bold text-lg mb-2">
                        Expected Output
                      </h5>
                      <p className="w-full bg-[#000D1C] py-4 px-4 rounded-lg text-white">
                        {expectedOutputs[index]}
                      </p>
                    </div>
                    <div>
                      <h5 className="font-bold text-lg mb-2">Student Output</h5>
                      <p
                        className={`w-full py-4 px-4 rounded-lg border-2 transition-all bg-[#000D1C] text-white ${
                          isCorrect
                            ? "border-green-500 text-green-400"
                            : "border-red-500 text-red-400"
                        }`}
                      >
                        {answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Score and Grade Section */}
        <div>
          <div>
            <h2 className="p-6 text-3xl font-bold text-[#014C06] mb-4">
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
          </div>
          <div className="min-w-[300px] h-[250px] rounded-lg shadow-md flex flex-col justify-center items-center p-6">
            <CreateFeedback />
          </div>
        </div>
      </div>
    </div>
  );
}

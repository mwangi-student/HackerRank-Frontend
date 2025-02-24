import React from "react";
import { challenges } from "../data/challenge-questions-data";

export default function ChallengesList({ language }) {
  const filteredChallenges = challenges.filter(
    (challenge) => challenge.language === language
  );

  return (
    <div>
      {filteredChallenges.map((challenge, index) => (
        <div
          key={challenge.title}
          className="w-[1000px] items-center bg-white py-6 px-6 my-4 rounded-lg hover:bg-[#ebebf3] border border-gray-200"
        >
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <h5 className="text-xl font-medium">{challenge.title}</h5>
              <div className="flex gap-4">
                {(challenge.difficulty === "Hard" && (
                  <p className="text-sm text-red-500 font-medium">
                    {challenge.difficulty}
                  </p>
                )) ||
                  (challenge.difficulty === "Medium" && (
                    <p className="text-sm text-amber-500 font-medium">
                      {challenge.difficulty}
                    </p>
                  )) || (
                    <p className="text-sm text-green-500 font-medium">
                      {challenge.difficulty}
                    </p>
                  )}
                <p className="text-sm font-normal text-slate-500">
                  Max Score: {challenge.max_score}
                </p>
              </div>
            </div>
            <button className="border border-gray-400 hover:border-sky-500 px-2 rounded-lg">
              Solve Challenge
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

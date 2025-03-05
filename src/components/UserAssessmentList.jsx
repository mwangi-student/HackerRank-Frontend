import React from "react";
import { userScores } from "../data/user-scores";

export default function UserAssessmentList() {
  return (
    <div className="flex-wrap gap-5">
      <h5 className="text-2xl text-semibold">Students</h5>
      <p className="font-base text-lg">
        List of students that have finished the assessments.
      </p>
      <div className="w-[900px] items-center py-4 px-4 my-8 rounded-lg">
        <div className="w-[680px] mx-2 mb-2 flex flex-row justify-between">
          <span className="font-medium text-lg">Users</span>
          <span className="font-medium text-lg">Scores</span>
        </div>
        {userScores.length > 0 ? (
          <ul
            role="list"
            className="bg-white divide-y divide-gray-100 rounded-lg"
          >
            {userScores.map((user, index) => (
              <li
                key={user.id || index}
                className="flex justify-between gap-x-6 py-3 hover:bg-[#ebebf3] px-5"
              >
                <h3>{user.name}</h3>
                <div className="flex flex-row gap-12">
                  <span className="font-medium">{user.scores}%</span>
                  <button className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250">
                    view solution
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#192533] text-[16px] font-medium bg-white rounded-lg py-4 px-4">
            No student has finished assessment.
          </p>
        )}
      </div>
    </div>
  );
}

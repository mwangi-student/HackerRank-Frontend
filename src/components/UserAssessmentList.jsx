import React, { useEffect, useState } from "react";
import { userScores } from "../data/user-scores";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserAssessmentList() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  // Fetch all assessment submissions
  useEffect(() => {
    if (authToken) {
      axios.get("http://127.0.0.1:5000/submission", {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      .then((response) => setSubmissions(response.data))
      .catch((error) => console.error("Failed to fetch submissions", error));
    }
  }, [authToken]);

  const handleViewScore = (submissionId) => {
    const submission = submissions.find(sub => sub.id === submissionId);
    if (submission) {
      if (submission.assessmentType === "code-challenge") {
        navigate("/grade/challenge", { state: { submission } });
      } else if (submission.assessmentType === "mcq-assessment-type") {
        navigate("/grade/mcquestions", { state: { submission } });
      }
    }
  };

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
                  <button 
                    onClick={() => handleViewScore(user.id)} 
                    className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250"
                  >
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
import React, { useEffect, useState } from "react";
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

  const handleViewScore = (submission) => {
    if (submission.assessment_type === "mcq-assessment-type" || submission.assessment_type === "mcq") {
      navigate("/grade/mcq-submission", { state: { submission } });
    } else if (submission.assessment_type === "code-challenge") {
      navigate("/grade/code-challenge", { state: { submission } });
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
          <span className="font-medium text-lg">Submission Time</span>
        </div>
        {submissions.length > 0 ? (
          <ul
            role="list"
            className="bg-white divide-y divide-gray-100 rounded-lg"
          >
            {submissions.map((submission, index) => (
              <li
                key={submission.id || index}
                className="flex justify-between gap-x-6 py-3 hover:bg-[#ebebf3] px-5"
              >
                <div>
                  <h3>{submission.student_username}</h3>
                  <p className="text-sm text-gray-500">{submission.assessment_title}</p>
                </div>
                <div className="flex flex-row gap-12">
                  <span className="font-medium">
                    {new Date(submission.submitted_at).toLocaleString()}
                  </span>
                  <button 
                    onClick={() => handleViewScore(submission)} 
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
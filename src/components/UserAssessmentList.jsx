import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserAssessmentList() {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      axios.get("http://127.0.0.1:5000/submission", {
        headers: { Authorization: `Bearer ${authToken}` },
      })
      .then((response) => {
        console.log("API Response:", response.data); // Debugging Log
        setSubmissions(response.data.submissions);
      })
      .catch((error) => console.error("Failed to fetch submissions", error));
    }
  }, [authToken]);

  return (
    <div className="flex-wrap gap-5">
      <h5 className="text-2xl font-semibold">Assessment Submissions</h5>
      <p className="font-base text-lg">
        List of students who have submitted assessments.
      </p>

      {/* Submissions List */}
      <div className="w-[900px] items-center py-4 px-4 my-8 rounded-lg">
        <h6 className="text-lg font-medium">Submissions</h6>
        {submissions.length > 0 ? (
          <ul className="bg-white divide-y divide-gray-100 rounded-lg">
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
                    {submission.submitted_at ? new Date(submission.submitted_at).toLocaleString() : "N/A"}
                  </span>
                  <button 
                    onClick={() => navigate("/grade/mcq-submission", { state: { submission } })} 
                    className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250"
                  >
                    View Solution
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#192533] text-[16px] font-medium bg-white rounded-lg py-4 px-4">
            No student has submitted an assessment yet.
          </p>
        )}
      </div>
    </div>
  );
}

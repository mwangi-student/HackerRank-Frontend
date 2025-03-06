import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AssessmentForm from "./AssessmentForm";
import AssessmentContext from "../Contexts/AssessmentContext";

export default function UnpublishedAssessments() {
  const { authToken } = useContext(AssessmentContext);
  const [assessments, setAssessments] = useState([]);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    assessmentType: "",
    numberOfQuestions: 1,
    currentQuestionIndex: 0,
    currentMCQ: { question: "", choices: { a: "", b: "", c: "", d: "" }, correctAnswer: "" },
    codeChallenge: { task: "", example: "", inputFormat: "", outputFormat: "", constraints: "", sampleInput: "", sampleOutput: "" },
  });

  useEffect(() => {
    const fetchUnpublishedAssessments = async () => {
      if (!authToken) return;
      try {
        const response = await axios.get("http://127.0.0.1:5000/assessment", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (!Array.isArray(response.data)) return;
        const unpublishedAssessments = response.data.filter(
          (assessment) => String(assessment.publish) === "0"
        );
        setAssessments(unpublishedAssessments);
      } catch (error) {
        console.error("Failed to fetch assessments", error.response?.data || error.message);
      }
    };
    fetchUnpublishedAssessments();
    const intervalId = setInterval(fetchUnpublishedAssessments, 1000);
    return () => clearInterval(intervalId);
  }, [authToken]);

  const handleReviewClick = (assessment) => {
    setSelectedAssessment(assessment);
    setFormData({ ...formData, title: assessment.title });
    setIsReviewPopupOpen(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMCQChange = (e) => {
    setFormData({
      ...formData,
      currentMCQ: { ...formData.currentMCQ, [e.target.name]: e.target.value },
    });
  };

  const handleMCQChoicesChange = (e) => {
    setFormData({
      ...formData,
      currentMCQ: {
        ...formData.currentMCQ,
        choices: { ...formData.currentMCQ.choices, [e.target.name]: e.target.value },
      },
    });
  };

  const handleCodeChange = (e) => {
    setFormData({
      ...formData,
      codeChallenge: { ...formData.codeChallenge, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="flex-wrap gap-5">
      <h5 className="text-2xl pb-6 font-semibold">Unpublished Assessments</h5>
      <div className="w-[1300px] items-center py-4 px-4 my-8 rounded-lg">
        {assessments.length > 0 ? (
          <ul role="list" className="divide-y divide-gray-100 bg-white rounded-lg">
            {assessments.map((assessment) => (
              <li key={assessment.id} className="flex justify-between gap-x-6 py-3 hover:bg-[#ebebf3] px-5">
                <h3>{assessment.title}</h3>
                <button
                  onClick={() => handleReviewClick(assessment)}
                  className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250"
                >
                  Review
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#192533] text-[16px] font-medium">No unpublished assessments available.</p>
        )}
      </div>
      {isReviewPopupOpen && (
        <AssessmentForm
          formData={formData}
          handleChange={handleChange}
          handleMCQChange={handleMCQChange}
          handleMCQChoicesChange={handleMCQChoicesChange}
          handleCodeChange={handleCodeChange}
          handleSubmit={handleSubmit}
          onClose={() => setIsReviewPopupOpen(false)}
        />
      )}
    </div>
  );
}

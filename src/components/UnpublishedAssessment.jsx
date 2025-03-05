import React, { useState } from "react";
import AssessmentInviteForm from "./AssessmentInviteForm";
import AssessmentForm from "./AssessmentForm";

export default function UnpublishedAssessments() {
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);
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

  const assessments = [
    {
      id: 1,
      title: "Javascript Swap Cases challenge",
      description: "Swap the cases of characters in a given string.",
      difficulty: "Medium",
      category: "JavaScript",
      constraints: "Use only built-in string methods"
    }
  ];

  const handleInviteClick = () => setIsInvitePopupOpen(true);
  const handleReviewClick = (assessment) => {
    setSelectedAssessment(assessment);
    setFormData({ ...formData, title: assessment.title }); // Populate title from selected assessment
    setIsReviewPopupOpen(true);
  };

  const handleCloseInvitePopup = () => setIsInvitePopupOpen(false);
  const handleCloseReviewPopup = () => setIsReviewPopupOpen(false);

  const handleInviteSubmit = (formData) => {
    console.log("Inviting students:", formData);
  };

  const handleUpdateAssessment = (updatedData) => {
    console.log("Updating assessment:", updatedData);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

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

  const handleAddQuestion = () => {
    setFormData({
      ...formData,
      currentQuestionIndex: formData.currentQuestionIndex + 1,
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
    console.log("Submitting assessment:", formData);
  };

  return (
    <div className="flex-wrap gap-5">
      <h5 className="text-2xl font-semibold">Unpublished Assessments</h5>
      <div className="w-[1300px] items-center py-4 px-4 my-8 rounded-lg">
        {assessments.length > 0 ? (
          <ul role="list" className="divide-y divide-gray-100 bg-white rounded-lg">
            {assessments.map((assessment) => (
              <li key={assessment.id} className="flex justify-between gap-x-6 py-3 hover:bg-[#ebebf3] px-5">
                <h3>{assessment.title}</h3>
                <button onClick={handleInviteClick} className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250">
                  Invite Students
                </button>
                <button onClick={() => handleReviewClick(assessment)} className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250">
                  Review
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#192533] text-[16px] font-medium">No assessments created.</p>
        )}
      </div>

      {/* Invite Students Popup */}
      <AssessmentInviteForm isOpen={isInvitePopupOpen} onClose={handleCloseInvitePopup} onSubmit={handleInviteSubmit} />

      {/* Review Assessment Popup */}
      {isReviewPopupOpen && (
        <AssessmentForm
          formData={formData}
          handleChange={handleChange}
          handleMCQChange={handleMCQChange}
          handleMCQChoicesChange={handleMCQChoicesChange}
          handleAddQuestion={handleAddQuestion}
          handleCodeChange={handleCodeChange}
          handleSubmit={handleSubmit}
          onClose={handleCloseReviewPopup}
        />
      )}
    </div>
  );
}

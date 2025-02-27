import React, { useState } from "react";
import AssessmentInviteForm from "./AssessmentInviteForm";
import CreateAssessmentForm from "./CreateAssessmentForm";

export default function UnpublishedAssessments() {
  const [isInvitePopupOpen, setIsInvitePopupOpen] = useState(false);
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

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

  const handleInviteClick = () => {
    setIsInvitePopupOpen(true);
  };

  const handleReviewClick = (assessment) => {
    setSelectedAssessment(assessment);
    setIsReviewPopupOpen(true);
  };

  const handleCloseInvitePopup = () => {
    setIsInvitePopupOpen(false);
  };

  const handleCloseReviewPopup = () => {
    setIsReviewPopupOpen(false);
  };

  const handleInviteSubmit = (formData) => {
    console.log("Inviting students:", formData);
    // Send data to backend here
  };

  const handleUpdateAssessment = (updatedData) => {
    console.log("Updating assessment:", updatedData);
    // Handle assessment update logic here
  };

  return (
    <div className="flex-wrap gap-5">
      <h5 className="text-2xl font-semibold">Unpublished Assessments</h5>
      <div className="w-[1300px] items-center py-4 px-4 my-8 rounded-lg">
        {assessments.length > 0 ? (
          <ul
            role="list"
            className="divide-y divide-gray-100 bg-white rounded-lg"
          >
            {assessments.map((assessment) => (
              <li
                key={assessment.id}
                className="flex justify-between gap-x-6 py-3 hover:bg-[#ebebf3] px-5"
              >
                <h3>{assessment.title}</h3>
                <button
                  onClick={handleInviteClick}
                  className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250"
                >
                  Invite Students
                </button>

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
          <p className="text-[#192533] text-[16px] font-medium">
            No assessments created.
          </p>
        )}
      </div>

      {/* Invite Students Popup */}
      <AssessmentInviteForm
        isOpen={isInvitePopupOpen}
        onClose={handleCloseInvitePopup}
        onSubmit={handleInviteSubmit}
      />

      {/* Review Assessment Popup */}
      <CreateAssessmentForm
        isOpen={isReviewPopupOpen}
        onClose={handleCloseReviewPopup}
        onSubmit={handleUpdateAssessment}
        initialData={selectedAssessment} // Pass selected assessment data
        isUpdateMode={true} // Flag to show "Update" instead of "Create"
      />
    </div>
  );
}

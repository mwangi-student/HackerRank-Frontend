import React, { useState } from "react";
import {
  TmNavbar,
  PublishedAssessments,
  UnpublishedAssessments
} from "../../components";
import AssessmentFormModal from "../../components/CreateAssessmentForm";

export default function AdminAssessment() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormSubmit = (formData) => {
    console.log("Assessment Submitted:", formData);
    // Handle submission logic (e.g., send data to backend)
  };

  return (
    <div className="bg-[#ededed] font-[Montserrat] flex flex-col min-h-screen w-full">
      <div className="fixed top-0 w-full z-[100]">
        <TmNavbar />
      </div>
      <main className="flex-grow">
        <div className="h-[250px] w-full items-center gap-5 py-[5%] pl-[10%] pr-[17%] flex-wrap bg-gradient-to-b from-[rgba(170, 255, 174, 0.8)] to-[rgba(237,237,237,0)]">
          <div className="flex flex-row gap-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              height="24"
              width="24"
              role="img"
              aria-label="Paper Write Icon"
            >
              <path
                stroke="#014c06"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m13.05 19.14 -3.71998 0.53 0.53 -3.67L19.41 6.45995c0.4265 -0.39744 0.9907 -0.61381 1.5736 -0.60352 0.5829 0.01028 1.139 0.24642 1.5513 0.65866 0.4122 0.41224 0.6484 0.96839 0.6586 1.5513 0.0103 0.5829 -0.206 1.14704 -0.6035 1.57357L13.05 19.14Z"
                strokeWidth="1.5"
              ></path>
            </svg>
            <h2 className="text-3xl text-bold text-[#014C06]">Assessments</h2>
          </div>
          <hr className="w-38 border-gray-400 border-2 my-2" />
          <p className="font-medium text-lg text-[#014C06]">
            Create, review, publish and view student's assessments.
          </p>
        </div>
        <div className="min-h-[200px] w-full items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
          <PublishedAssessments />
        </div>
        <div className="min-h-[200px] w-full items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
          <UnpublishedAssessments />
        </div>
        <div className="min-h-[200px] w-full items-center gap-5 py-[1.5%] pl-[10%] pr-[17%] flex-wrap">
          <p className="font-medium text-lg text-[#014C06]">
            Create an Assessment.
          </p>
          <hr className="w-32 border-gray-400 border-2 my-2" />
          <button
            className="px-3 py-2 rounded-lg text-white bg-[#13813A] hover:bg-[#527254] transition duration-200"
            onClick={handleOpenModal}
          >
            Create
          </button>
        </div>
      </main>
      {/* Modal Component */}
      <AssessmentFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}

import React from "react";

export default function AssessmentList() {
  const assessments = [];
  return (
    <div className="flex-wrap gap-5">
      <h3 className="text-2xl text-semibold">Assessments</h3>
      <p className="font-medium text-lg">View assessments sent to you from your Technical Mentor</p>
      <div className="w-[1000px] items-center bg-white py-4 px-4 my-8 rounded-lg">
        {assessments.length > 0 ? (
          <ul role="list" className="divide-y divide-gray-100">
            {assessments.map((assessment) => (
              <li
                key={assessment.id}
                className="flex justify-between gap-x-6 py-5"
              >
                <h3>{assessment.title}</h3>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#192533] text-[16px] font-medium">
            No assessments scheduled.
          </p>
        )}
      </div>
    </div>
  );
}

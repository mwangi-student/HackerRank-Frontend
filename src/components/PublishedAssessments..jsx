import React from 'react'

export default function PublishedAssessments() {
    const assessments = []

  return (
    <div className="flex-wrap gap-5">
      <h5 className="text-2xl text-semibold">Published Assessments</h5>
      <div className="w-[1300px] items-center bg-white py-4 px-4 my-8 rounded-lg">
        {assessments.length > 0 ? (
          <ul role="list" className="divide-y divide-gray-100">
            {assessments.map((assessment) => (
              <li
                key={assessment.id}
                className="flex justify-between gap-x-6 py-5"
              >
                    <h3>{assessment.title}</h3>
                    <button className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250">
            view
          </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-[#192533] text-[16px] font-medium">
            No assessments published.
          </p>
        )}
      </div>
    </div>
  )
}

import React from 'react'

export default function PublishedAssessments() {
    const assessments = [
        { title: "Python Max Number Generator challenge" },
        {title: "React and Tailwind Quiz (multiple choices)"}
    ]

  return (
    <div className="flex-wrap gap-5">
      <h5 className="text-2xl text-semibold">Published Assessments</h5>
      <div className="w-[1300px] items-center py-4 px-4 my-8 rounded-lg">
        {assessments.length > 0 ? (
          <ul role="list" className="bg-white divide-y divide-gray-100 rounded-lg">
            {assessments.map((assessment, index) => (
              <li
                key={assessment.id || index}
                className="flex justify-between gap-x-6 py-3 hover:bg-[#ebebf3] px-5"
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

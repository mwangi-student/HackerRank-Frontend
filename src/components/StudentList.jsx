import React from 'react'

export default function StudentList() {
    const students = [
        { name: "Antony", email: "antony@gmail.com" },
        { name: "Faith", email: "faith@gmail.com" },
        { name: "David", email: "david@gmail.com" },
        { name: "Charles", email: "charles@gmail.com" },
        { name: "Vivian", email: "vivian@gmail.com" },
        { name: "Lee", email: "lee@gmail.com" },
        { name: "Robin", email: "robin@gmail.com" },
        { name: "John", email: "john@gmail.com" },
        { name: "Brian", email: "brian@gmail.com" },
        { name: "Zion", email: "zion@gmail.com" }
    ]

  return (
    <div className="flex-wrap gap-5">
      <h5 className="text-2xl text-semibold">Students List</h5>
      <div className="w-[1300px] items-center py-4 px-4 my-8 rounded-lg">
        {students.length > 0 ? (
          <ol role="list" className="divide-y divide-gray-100 bg-white rounded-lg">
            {students.map((student) => (
              <li
                key={student.id}
                className="flex justify-between gap-x-6 py-3 px-5"
              >
                    <h3>{student.name}</h3>
                    <h3>{student.email}</h3>

                    <button className="px-3 py-2 rounded-lg text-white bg-[#527254] hover:bg-[#13813A] transition duration-250">
            view
          </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-[#192533] text-[16px] font-medium">
            No assessments published.
          </p>
        )}
      </div>
    </div>
  )
}

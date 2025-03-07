import React, { useEffect, useState } from 'react';

export default function StudentList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch student data from the backend
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT token
        if (!token) {
          throw new Error('No token found');
        }

        const response = await fetch('http://127.0.0.1:5000/students', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Include JWT token
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

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
                <h3>{student.username}</h3>
                <h3>{student.email}</h3>

                <button className="px-3 py-2 rounded-lg text-white bg-red-700 hover:bg-red-500 transition duration-250">
                  drop
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-[#192533] text-[16px] font-medium">
            No students found.
          </p>
        )}
      </div>
    </div>
  );
}
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AssessmentInviteForm({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    assessment_id: "",
    selectedStudents: [],
  });
  const [students, setStudents] = useState([]); // State to store fetched students
  const [assessments, setAssessments] = useState([]); // State to store fetched assessments
  const [user, setUser] = useState(null); // State to store current user
  const [authToken, setAuthToken] = useState(localStorage.getItem("token")); // Get auth token from localStorage

  // Fetch current user
  const fetchCurrentUser = async () => {
    console.log("fetchCurrentUser function called");

    let token = localStorage.getItem("token");
    console.log("Retrieved token from localStorage:", token);

    if (!token) {
      console.log("No auth token found");
      return;
    }

    try {
      console.log("Sending request with token:", token);

      const response = await fetch("http://127.0.0.1:5000/current_user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Response received:", response);

      if (response.status === 401) {
        console.log("Token expired. Trying refresh...");
        const refreshToken = localStorage.getItem("refresh_token");
        console.log("Refresh token:", refreshToken);

        const refreshResponse = await fetch("http://127.0.0.1:5000/refresh", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${refreshToken}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Refresh response:", refreshResponse);

        if (refreshResponse.ok) {
          const refreshData = await refreshResponse.json();
          console.log("New token received:", refreshData.access_token);
          localStorage.setItem("token", refreshData.access_token);
          setAuthToken(refreshData.access_token); // Update auth token state
          return fetchCurrentUser(); // Retry with new token
        } else {
          console.log("Refresh token failed. Redirecting to login...");
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
      }

      if (!response.ok) {
        console.error("Failed to fetch user:", response.status);
        return;
      }

      const userData = await response.json();
      console.log("Fetched user data:", userData);
      setUser(userData); // Set current user
      return userData;
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // Fetch published assessments
  const fetchAssessments = async () => {
    if (!authToken) return;
    try {
      const response = await axios.get("http://127.0.0.1:5000/assessment", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      const publishedAssessments = response.data.filter(
        (assessment) => assessment.publish == 1
      );
      setAssessments(publishedAssessments);
    } catch (error) {
      console.error("Failed to fetch assessments", error.response?.data || error.message);
    }
  };

  // Fetch students
  const fetchStudents = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/students", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const students = await response.json();
        setStudents(students); // Set fetched students
      } else {
        console.error("Failed to fetch students");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Send assessment invites
  const sendAssessmentInvite = async (studentIds) => {
    if (!user?.id || !formData.assessment_id) {
      return { success: false, message: "Missing required invite details" };
    }

    const inviteData = {
      student_ids: studentIds,
      assessment_id: formData.assessment_id,
      tm_id: user.id, // Use the current user's ID as the TM ID
      status: "pending",
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/assessment-invites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(inviteData),
      });

      if (response.ok) {
        const result = await response.json();
        return { success: true, message: "Assessment invites sent successfully", data: result };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.error || "Failed to send assessment invites" };
      }
    } catch (error) {
      console.error("Failed to send assessment invites", error);
      return { success: false, message: "Failed to send assessment invites" };
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchCurrentUser().then((userData) => {
      if (userData) {
        fetchAssessments();
        fetchStudents();
      }
    });
  }, [authToken]);

  // Handle student selection
  const handleStudentSelection = (studentId) => {
    setFormData((prev) => {
      const alreadySelected = prev.selectedStudents.includes(studentId);
      return {
        ...prev,
        selectedStudents: alreadySelected
          ? prev.selectedStudents.filter((id) => id !== studentId)
          : [...prev.selectedStudents, studentId],
      };
    });
  };

  // Handle select all students
  const allSelected = formData.selectedStudents.length === students.length;
  const handleSelectAll = () => {
    setFormData((prev) => ({
      ...prev,
      selectedStudents: allSelected ? [] : students.map((s) => s.id),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await sendAssessmentInvite(formData.selectedStudents);
    if (result.success) {
      toast.success(result.message); // Show success toast
      onClose(); // Close the modal
    } else {
      toast.error(result.message); // Show error toast
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} /> {/* Toast container */}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invite Students</h2>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            {/* Assessment ID Input */}
            <select
              name="assessment_id"
              value={formData.assessment_id}
              onChange={(e) => setFormData({ ...formData, assessment_id: e.target.value })}
              className="border p-2 rounded-lg w-full"
              required
            >
              <option value="" disabled>
                Select Assessment
              </option>
              {assessments.map((assessment) => (
                <option key={assessment.id} value={assessment.id}>
                  {assessment.title}
                </option>
              ))}
            </select>

            {/* Student Selection List */}
            <div className="border p-2 rounded-lg w-full max-h-40 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2">Select Students:</h3>
              <label className="flex items-center space-x-2 mb-2 font-semibold">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleSelectAll}
                  className="w-4 h-4"
                />
                <span>Select All</span>
              </label>
              {students.map((student) => (
                <label key={student.id} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    value={student.id}
                    checked={formData.selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelection(student.id)}
                    className="w-4 h-4"
                  />
                  <span>{student.username}</span>
                </label>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 border rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Send Invites
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
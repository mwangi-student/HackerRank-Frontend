import React, { createContext, useState, useEffect } from "react";

export const MCQSubmissionContext = createContext();

export default function MCQSubmissionProvider({ children }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken"); // Assuming auth token is stored in local storage

  // Fetch all MCQ submissions
  const fetchAllSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/mcq-submissions", {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) throw new Error("Failed to fetch submissions");

      const data = await response.json();
      setSubmissions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single submission by ID
  const fetchSubmissionById = async (submissionId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://127.0.0.1:5000/mcq-submissions/${submissionId}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });

      if (!response.ok) throw new Error("Submission not found");

      return await response.json();
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Create a new MCQ submission
  const createSubmission = async (submissionData) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/mcq-submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) throw new Error("Failed to create submission");

      const newSubmission = await response.json();
      setSubmissions([...submissions, newSubmission]); // Add new submission to state
      return newSubmission;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <MCQSubmissionContext.Provider
      value={{
        submissions,
        loading,
        error,
        fetchAllSubmissions,
        fetchSubmissionById,
        createSubmission,
      }}
    >
      {children}
    </MCQSubmissionContext.Provider>
  );
}

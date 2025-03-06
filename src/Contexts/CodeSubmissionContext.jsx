import React, { createContext, useState, useEffect } from "react";

export const CodeSubmissionContext = createContext();

export default function CodeSubmissionProvider({ children }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const authToken = localStorage.getItem("authToken"); // Assuming you store auth token in local storage

  // Fetch all code submissions
  const fetchAllSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/code-submissions", {
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
      const response = await fetch(`http://127.0.0.1:5000/code-submissions/${submissionId}`, {
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

  // Create a new code submission
  const createSubmission = async (submissionData) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/code-submissions", {
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
    <CodeSubmissionContext.Provider
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
    </CodeSubmissionContext.Provider>
  );
}

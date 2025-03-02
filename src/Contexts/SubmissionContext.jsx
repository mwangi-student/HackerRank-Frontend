import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const { authToken } = useContext(UserContext);
  const [submissions, setSubmissions] = useState([]);

  // Fetch submissions
  useEffect(() => {
    if (authToken) {
      axios.get("http://127.0.0.1:5000/submission", {
        headers: { Authorization: `Bearer ${authToken}` }
      })
        .then((response) => setSubmissions(response.data))
        .catch((error) => console.error("Failed to fetch submissions", error.response?.data || error.message));
    }
  }, [authToken]);

  // Function to submit a new submission
  const submitAssignment = async (submissionData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/submission", submissionData, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (response.status === 201) {
        setSubmissions((prevSubmissions) => [...prevSubmissions, response.data]);
        return { success: true, message: "Submission successful" };
      }
    } catch (error) {
      console.error("Failed to submit assignment", error.response?.data || error.message);
      return { success: false, message: "Failed to submit assignment" };
    }
  };

  // Function to delete a submission
  const deleteSubmission = async (submissionId) => {
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/submission/${submissionId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });

      if (response.status === 200) {
        setSubmissions((prevSubmissions) => prevSubmissions.filter(submission => submission.id !== submissionId));
        return { success: true, message: "Submission deleted successfully" };
      }
    } catch (error) {
      console.error("Failed to delete submission", error.response?.data || error.message);
      return { success: false, message: "Failed to delete submission" };
    }
  };

  return (
    <SubmissionContext.Provider value={{ submissions, submitAssignment , deleteSubmission}}>
      {children}
    </SubmissionContext.Provider>
  );
};

export default SubmissionContext;

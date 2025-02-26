import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
  const [assessments, setAssessments] = useState([]);
  const [authToken, setAuthToken] = useState(() =>
    sessionStorage.getItem("token")
  );

  // Fetch assessments
  useEffect(() => {
    const fetchAssessments = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5000/assessments", {
          headers: { Authorization: `Bearer ${authToken}` }
        });
        setAssessments(response.data);
      } catch (error) {
        console.error("Failed to fetch assessments", error.response?.data || error.message);
      }
    };

    if (authToken) {
      fetchAssessments();
    }
  }, [authToken]);

  // Function to submit assessment results
  const submitAssessment = async (assessmentId, answers) => {
    try {
      const response = await axios.post(
        `http://127.0.0.1:5000/assessments/${assessmentId}/submit`,
        { answers },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );
      return { success: true, message: "Assessment submitted successfully", data: response.data };
    } catch (error) {
      console.error("Failed to submit assessment", error.response?.data || error.message);
      return { success: false, message: "Failed to submit assessment" };
    }
  };

  // Function to delete Assessment
  const deleteAssessment = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/assessments/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setAssessments(prevAssessments => prevAssessments.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting Assessments:", error.response?.data || error.message);
    }
  };

  return (
    <AssessmentContext.Provider value={{ assessments, submitAssessment, deleteAssessment }}>
      {children}
    </AssessmentContext.Provider>
  );
};

export default AssessmentContext;

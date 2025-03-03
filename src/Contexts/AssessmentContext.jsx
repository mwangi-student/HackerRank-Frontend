import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import  UserContext  from "./UserContext";

const AssessmentContext = createContext();

export const AssessmentProvider = ({ children }) => {
  const { authToken, user } = useContext(UserContext); // Extracts authToken and user info
  const [assessments, setAssessments] = useState([]);

  // Fetch all assessments
  useEffect(() => {
    const fetchAssessments = async () => {
      if (!authToken) return;
      try {
        const response = await axios.get("http://127.0.0.1:5000/assessment", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setAssessments(response.data);
      } catch (error) {
        console.error("Failed to fetch assessments", error.response?.data || error.message);
      }
    };
    fetchAssessments();
  }, [authToken]);

  // Fetch a single assessment
  const getAssessment = async (id) => {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/assessment/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      return response.data;
    } catch (error) {
      console.error("Failed to fetch assessment", error.response?.data || error.message);
      return null;
    }
  };

  // Create a new assessment (ensuring tm_id is included)
  const createAssessment = async (data) => {
    if (!user?.tm_id) {
      return { success: false, message: "Missing required tm_id" };
    }

    const requestData = { ...data, tm_id: user.tm_id }; // Add tm_id to request

    try {
      const response = await axios.post("http://127.0.0.1:5000/assessment", requestData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      setAssessments((prev) => [...prev, { ...requestData, id: response.data.id }]);
      return { success: true, message: "Assessment created successfully" };
    } catch (error) {
      console.error("Failed to create assessment", error.response?.data || error.message);
      return { success: false, message: "Failed to create assessment" };
    }
  };

  // Update an existing assessment
  const updateAssessment = async (id, data) => {
    try {
      await axios.patch(`http://127.0.0.1:5000/assessment/${id}`, data, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAssessments((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...data } : item))
      );
      return { success: true, message: "Assessment updated successfully" };
    } catch (error) {
      console.error("Failed to update assessment", error.response?.data || error.message);
      return { success: false, message: "Failed to update assessment" };
    }
  };

  // Delete an assessment
  const deleteAssessment = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/assessment/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      setAssessments((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting assessment:", error.response?.data || error.message);
    }
  };

  return (
    <AssessmentContext.Provider
      value={{ assessments, getAssessment, createAssessment, updateAssessment, deleteAssessment }}
    >
      {children}
    </AssessmentContext.Provider>
  );
};

export default AssessmentContext;

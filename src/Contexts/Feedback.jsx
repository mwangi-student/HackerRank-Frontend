import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const FeedbackContext = createContext();

export const FeedbackProvider = ({ children }) => {
  const { authToken } = useContext(UserContext);
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedback from the backend
  useEffect(() => {
    if (authToken) {
      axios.get("http://127.0.0.1:5000/feedbacks", {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      .then((response) => setFeedbacks(response.data))
      .catch((error) => console.error("Failed to fetch feedbacks", error.response?.data || error.message));
    }
  }, [authToken]);

  // Function to submit new feedback
  const submitFeedback = async (feedbackData) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/feedbacks", feedbackData, {
        headers: { 
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json"
        }
      });

      if (response.status === 201) {
        setFeedbacks((prevFeedbacks) => [...prevFeedbacks, response.data]);
        return { success: true, message: "Feedback submitted successfully" };
      }
    } catch (error) {
      console.error("Failed to submit feedback", error.response?.data || error.message);
      return { success: false, message: "Failed to submit feedback" };
    }
  };

  // Function to delete feedback
  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/feedbacks/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting feedback:", error.response?.data || error.message);
    }
  };

  return (
    <FeedbackContext.Provider value={{ feedbacks, submitFeedback, deleteFeedback }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;

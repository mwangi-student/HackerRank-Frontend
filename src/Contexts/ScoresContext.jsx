import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const ScoresContext = createContext();

const ScoresProvider = ({ children }) => {
  const [scores, setScores] = useState([]);
  const [selectedScore, setSelectedScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage

  useEffect(() => {
    fetchScores();
  }, []);

  // Fetch all scores
  const fetchScores = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/scores", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setScores(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to fetch scores");
    } finally {
      setLoading(false);
    }
  };

  // Fetch a single score by ID
  const fetchScoreById = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`/scores/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSelectedScore(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Score not found");
    } finally {
      setLoading(false);
    }
  };

  // Create a new score
  const createScore = async (newScore) => {
    setLoading(true);
    try {
      const response = await axios.post("/scores", newScore, {
        headers: { 
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });
      setScores([...scores, response.data.score]); // Update state
      setError(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create score");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScoresContext.Provider value={{ scores, selectedScore, loading, error, fetchScores, fetchScoreById, createScore }}>
      {children}
    </ScoresContext.Provider>
  );
};

export default ScoresProvider;

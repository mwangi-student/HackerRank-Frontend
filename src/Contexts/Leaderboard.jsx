import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";

const LeaderboardContext = createContext();

export const LeaderboardProvider = ({ children }) => {
  const { authToken } = useContext(UserContext);
  const [leaderboard, setLeaderboard] = useState([]);

  // Fetch the leaderboard data
  useEffect(() => {
    if (authToken) {
      axios.get("http://127.0.0.1:5000/leaderboard", {
        headers: { Authorization: `Bearer ${authToken}` }
      })
        .then((response) => setLeaderboard(response.data))
        .catch((error) => console.error("Failed to fetch leaderboard", error.response?.data || error.message));
    }
  }, [authToken]);

  // Function to update a user's score
  const updateScore = async (userId, newScore) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:5000/leaderboard/${userId}`,
        { score: newScore },
        { headers: { Authorization: `Bearer ${authToken}` } }
      );

      if (response.status === 200) {
        setLeaderboard((prevLeaderboard) =>
          prevLeaderboard.map((user) =>
            user.id === userId ? { ...user, score: newScore } : user
          )
        );
        return { success: true, message: "Score updated successfully" };
      }
      
    } catch (error) {
      console.error("Failed to update score", error.response?.data || error.message);
      return { success: false, message: "Failed to update score" };
    }
  };

  return (
    <LeaderboardContext.Provider value={{ leaderboard, updateScore }}>
      {children}
    </LeaderboardContext.Provider>
  );
};

export default LeaderboardContext;

